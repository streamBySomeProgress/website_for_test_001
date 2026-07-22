"use client"

import {useEffect, useState} from "react";

interface BroadcastElement {
    objectID: string,
    platform_id: string,
    datetime_start: string,
    product_cnt: number,
    visit_cnt: number | null,
    sales_cnt: number | null,
    sales_amt: number | null,
    title: string,
    cid: number
}
interface HomeshopElement {
    cat: { cid: number, cat_name: string },
    cid: number,
    hsshow_datetime_end: string,
    hsshow_datetime_start: string,
    hsshow_id: string,
    hsshow_title: string,
    hsshow_url_live: string,
    item_cnt: number,
    platform_id: string,
    platform_name: string,
    sales_amt: number | null,
    sales_cnt: number | null,
    visit_cnt: number | null,
}
interface InfosElement {
    labang_id: string,
    cid: number,
    cats: {
        [key: string]: {
            pid: null | number,
            name: string
        }
    },
}

async function fetchDatas({type} : {type: string}) {
    const res2 = await fetch('https://live.ecomm-data.com/api/assignment/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: type,
        }),
        cache: 'no-store', // 캐싱 방지 → 새로고침마다 실제로 다시 요청
    });

    return res2
}
async function fetchInfos() {
    const res2 = await fetch('https://live.ecomm-data.com/api/home/gnb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store', // 캐싱 방지 → 새로고침마다 실제로 다시 요청
    });

    return res2
}
export default function ClientSided() {
    const [switchedAs, setSwichedAs] = useState<'lb' | 'hs'>('lb');
    const [listOfBroadcast, setlistOfBroadcast] = useState<BroadcastElement[]>([]);
    const [listOfHomeShop, setlistOfHomeShop] = useState<HomeshopElement[]>([]);
    const [listOfInfo, setListOfInfo] = useState<InfosElement | null>(null);

    useEffect(() => {
        fetchDatas({type: switchedAs}).then(async (datas) => {
            const datasJson = await datas.json();
            if (switchedAs == 'lb') {
                setlistOfBroadcast(datasJson.list || []);
            } else {
                setlistOfHomeShop(datasJson.list || []);
            }
        })
    }, [switchedAs]);

    useEffect(() => {
        fetchInfos().then(async (data) => {
            const datasJson = await data.json();
            setListOfInfo(datasJson);
        })
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '1200px'}}>
            <div style={{borderWidth: '2px', borderColor: 'aliceblue', display: 'flex', flexDirection: 'row', justifyContent: 'center'}} onClick={() => setSwichedAs((prevState) => prevState == 'lb' ? 'hs' : 'lb')}>
                <h1>{switchedAs == 'lb' ? '라방(눌러서 변환)' : '홈쇼핑(눌러서 변환)'}</h1>
            </div>
                <div style={{display: "grid", gridTemplateColumns: '30px 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                    <div></div>
                    <div>방송정보</div>
                    <div>분류</div>
                    <div>방송시간</div>
                    {switchedAs == 'lb' ? <div>조회수</div> : <div>시청률</div>}
                    <div>판매량</div>
                    <div>매출액</div>
                    <div>상품수</div>
                </div>
            <div>
                <ul>
                    {switchedAs == 'lb' ?
                        listOfBroadcast.slice(0, 10).map((elements, i) => (
                            <li key={i}>
                                <div style={{width: '100%', height: '50px', display: "grid", gridTemplateColumns: '30px auto'}}>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                        <p>{i + 1}</p>
                                    </div>
                                    <div style={{display: "grid", gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                                        <div>{elements.title}</div>
                                        <div>{listOfInfo != null ? listOfInfo.cats[elements.cid.toString()].name : ''}</div>
                                        <div>{elements.datetime_start.slice(0, 2) + '.' + elements.datetime_start.slice(2, 4) + '.' + elements.datetime_start.slice(4, 6) + '-' + elements.datetime_start.slice(6, 8) + ':' + elements.datetime_start.slice(8, 10)}</div>
                                        <div>{elements.visit_cnt == null ? '로그인' : elements.visit_cnt}</div>
                                        <div>{elements.sales_cnt == null ? '로그인' : elements.sales_cnt}</div>
                                        <div>{elements.sales_amt == null ? '로그인' : elements.sales_amt}</div>
                                        <div>{elements.product_cnt}</div>
                                    </div>
                                </div>
                            </li>
                        ))
                        :
                        listOfHomeShop.slice(0, 10).map((elements, i) => (
                            <li key={i}>
                                <div style={{width: '100%', height: '50px', display: "grid", gridTemplateColumns: '30px auto'}}>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                        <p>{i + 1}</p>
                                    </div>
                                    <div style={{display: "grid", gridTemplateColumns: '2.5fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                                        <div>{elements.hsshow_title}</div>
                                        <div>{elements.cat.cat_name}</div>
                                        <div>{elements.hsshow_datetime_start.slice(0, 2) + '.' + elements.hsshow_datetime_start.slice(2, 4) + '.' + elements.hsshow_datetime_start.slice(4, 6) + '-' + elements.hsshow_datetime_start.slice(6, 8) + ':' + elements.hsshow_datetime_start.slice(8, 10)}</div>
                                        <div>{elements.visit_cnt == null ? '로그인' : elements.visit_cnt}</div>
                                        <div>{elements.sales_cnt == null ? '로그인' : elements.sales_cnt}</div>
                                        <div>{elements.sales_amt == null ? '로그인' : elements.sales_amt}</div>
                                        <div>{elements.item_cnt}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}
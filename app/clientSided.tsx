"use client"

import {useEffect, useState} from "react";

export interface BroadcastElement {
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

async function fetchDatas({type} : {type: string}) {
    const res2 = await fetch('https://live.ecomm-data.com/api/assignment/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'lb',
        }),
        cache: 'no-store', // 캐싱 방지 → 새로고침마다 실제로 다시 요청
    });

    return res2
}
//{listOfBroadcast = []}: {listOfBroadcast: BroadcastElement[]}
export default function ClientSided() {
    const [switchedAs, setSwichedAs] = useState<'lb' | 'hs'>('lb');
    const [listOfBroadcast, setlistOfBroadcast] = useState<BroadcastElement[]>([]);

    // const datas = await fetchDatas();
    // const datasJson = await datas.json();

    useEffect(() => {
        fetchDatas({type: switchedAs}).then(async (datas) => {
            const datasJson = await datas.json();
            setlistOfBroadcast(datasJson.list || [])
        })
    }, [switchedAs]);

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{width: '300px', borderWidth: '2px', borderColor: 'aliceblue', display: 'flex', flexDirection: 'row', justifyContent: 'center'}} onClick={() => setSwichedAs((prevState) => prevState == 'lb' ? 'hs' : 'lb')}>
                <h1>{switchedAs == 'lb' ? '라방(눌러서 변환)' : '홈쇼핑(눌러서 변환)'}</h1>
            </div>
            <ul>
                {listOfBroadcast.slice(0, 10).map((elements, i) => (
                    <li key={i}>
                        <div style={{width: '300px', height: '30px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                                <p>{i + 1}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
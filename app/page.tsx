import ClientSided, {BroadcastElement} from "@/app/clientSided";


// async function fetchDatas() {
//     const res2 = await fetch('https://live.ecomm-data.com/api/assignment/list', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             type: 'lb',
//         }),
//         cache: 'no-store', // 캐싱 방지 → 새로고침마다 실제로 다시 요청
//     });
//
//     return res2
// }


export default async function Home() {
    // const datas = await fetchDatas();
    // const datasJson = await datas.json();

    return (
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <h1>과제물</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {/*<div style={{display: 'flex', flexDirection: 'column'}}>*/}
                {/*    <h1>{switchedAs == 'live' ? '라방' : '홈쇼핑'}</h1>*/}
                {/*    <ul>*/}
                {/*        {listOfBroadcast.map((elements, i) => (*/}
                {/*            <li key={i}>{'dd'}</li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*<ClientSided listOfBroadcast={datasJson.list as BroadcastElement[]}/>*/}
                <ClientSided/>
            </div>
        </div>
    );
}

import ClientSided from "@/app/clientSided";


export default async function Home() {
    return (
        <div style={{width: '100%', height: '100%', padding: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <h1>과제물</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <ClientSided/>
            </div>
        </div>
    );
}

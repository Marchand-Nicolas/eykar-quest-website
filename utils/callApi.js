import Popup from "./popup";

export default function callApi(url, body) {
    return fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    .then(async response => {
        if (response.status >= 200 && response.status < 300) {
            const datas = await response.json();
            if (datas.hasOwnProperty("error")) error(1, datas);
            return datas;
        }
        error(0, { code: response.status });
        return {};
    })
}

function error(type, datas) {
    switch (type) {
        case 0:
            Popup(`The server responded unusually`, 
            <>
                <strong>Error code</strong> : {datas.code}
                <br></br>
                <br></br>
                <strong>Please contact us</strong>
            </>
            );
        break;
        default:
            Popup(`Error while processing the request`, <div dangerouslySetInnerHTML={{__html: `${datas.error}`}}/>);
        break;
    }
}
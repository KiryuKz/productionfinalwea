
export default function Test(){
    async function onChangex(e) {
        console.log(e.target.value)
    }
    return(
        <input type="file" onChange={onChangex}></input>
    )
}
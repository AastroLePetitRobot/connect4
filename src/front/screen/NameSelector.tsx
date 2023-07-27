import { FormEvent, useState } from "react"

type NameSelectorProps = {
    onSelect: (name:string) => void
    disabled: boolean
}




export function NameSelector ({onSelect, disabled}: NameSelectorProps){
    const[error,setError] = useState('')
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const name = new FormData(e.currentTarget as HTMLFormElement).get('name')
        if(!name || name.toString() === ''){
            setError('Vous devez choisir un pseudo')
            return;
        }
        onSelect(name.toString())
    }





    return <>
        <h1>Selection du pseudo</h1>
        {error && <div className="alert">
            {error}
            <div className="alert_close">&times;</div>
            </div>}
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Pseudo</label>
            <input disabled={disabled} type="text" id="name" name="name" required/>

            <button disabled={disabled}>Choisir</button>
        </form>
    </>

}
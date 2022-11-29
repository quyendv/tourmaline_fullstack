function InputForm({text}) {
    return (
        <div className="relative">
            <label className="pointer-events-none absolute top-0 left-0">{text}</label>
            <input className="w-full rounded-md p-2 outline-none"></input>
        </div>
    );
}

export default InputForm;

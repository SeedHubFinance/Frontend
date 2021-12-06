
const InputField =(props)=>{
    return (
        <>
            <div>
            <label>
                {props.label}
              <input
                    type={props.type}
                  onChange={(e) => {props.callBackFnInput(e.target.value)}}
              />
            </label>
            {props.buttonName ? 
            <button
                onClick={() =>{props.callBackFnButton()}}>
                  {props.buttonName} </button> 
            :
                null
            }
            </div>
        </>
    );
};

export default InputField;
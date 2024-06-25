import React from 'react';
import { useState } from 'react';

type CounterProps = {
    maximum: number | null,
    minimum: number | null,
    onSet: (value: number) => null | null
}

function Counter(props: CounterProps) {
    const counterMinimum: number = props.minimum ?? 0;
    const [value, setValue] = useState(counterMinimum);

    const setCounter = (value : number) => {
        if (props.onSet) { props.onSet(value);}
        setValue(value);
    }

    const onInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        let newValue: number = parseInt(event.target.value);
        if (props.minimum)
            newValue = Math.max(newValue, props.minimum)
        if (props.maximum)
            newValue = Math.min(newValue, props.maximum);
        setCounter(newValue);
        
    }

    return <>
        <button onClick={() => setCounter(value - 1)} disabled={props.minimum===null || value <= props.minimum}>-</button>
        <input value={value} type="number" onChange={onInputChange} />
        <button onClick={() => setCounter(value + 1)} disabled={props.maximum===null || value >= props.maximum}>+</button>
    </>;
}

export default Counter;
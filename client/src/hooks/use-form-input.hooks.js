import { useState } from "react";


const useFormInput = (intialValue) => {
  const [state, setState] = useState(intialValue);

  const handlleChange = e => {
    const { name, value } = e.target;
    setState(state => ({ ...state, [name]: value }))
  }
  const update = activeBookmark => {
    setState({
      title: activeBookmark ? activeBookmark.title : '',
      url: activeBookmark ? activeBookmark.url : '',
      tags: activeBookmark ? activeBookmark.tags.join(',') : '',
      notes: activeBookmark ? activeBookmark.notes : ''
    })
  }
  const reset = intialValue => setState(intialValue)

  return [state, handlleChange, reset, update]

}

export default useFormInput;
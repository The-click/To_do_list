import React, {useState} from 'react'

function UserField({id, text, editUser, type }){
    const [isEdit, setIsEdit] = useState(false);
    return(<td>
        {isEdit ? <input value={text} onChange={(e) => editUser(id, type, e)} onBlur={(e) => setIsEdit(false)}/> : <span onClick={() => setIsEdit(true)}>{text}</span>}
        
        </td>)

}

export default UserField
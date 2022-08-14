import React from 'react';
import UserField from './UserField';



function User({name, surname, age, id, ban, goBan, isEdit, editUser}){
  

    return(
        <tr>
            <UserField id={id} text={name} editUser={editUser} isEdit={isEdit} type="name"/>
            <UserField id={id} text={surname} editUser={editUser} isEdit={isEdit} type="surn"/>
            <UserField id={id} text={age} editUser={editUser} isEdit={isEdit} type="age"/>
            <td>{id}</td>
            <td bgcolor={ ban ? 'red':"green" }> {ban ? 'banned': 'not banned'}</td>
            <td><button onClick={() => goBan(id)}>{ban ? 'not Ban' : 'go Ban'}</button></td>
            </tr>
    )

}
export default User

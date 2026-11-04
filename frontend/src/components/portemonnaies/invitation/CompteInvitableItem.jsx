import { UserPlus } from "lucide-react";
export default function CompteInvitableItem({id,email,userName,alreadyInvited,alreadyPresent, onClick}){
    return (<button  type="button" className="list-group-item list-group-item-action small fw-medium "
                     key={id}
                     disabled={alreadyPresent || alreadyInvited}
                     onClick={onClick}
    >
        {userName} - {email} {alreadyPresent ? "(déja présent)" : (alreadyInvited ? "(Invitation en attente)":"")}
        <UserPlus size={14} className="me-1" /> Inviter

    </button>)
}

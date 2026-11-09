import { UserMinus } from "lucide-react";
export default function ParticipantItem({id,pseudo,prenom, onClick, estProtege}){
    return (<button  type="button" className="list-group-item list-group-item-action small fw-medium "
                     key={id}
                     onClick={onClick}
    >
       {prenom} <small className="text-muted ms-1">@{pseudo}</small>
        {!estProtege ? <><UserMinus size={14} className="me-1" /> Retirer </> : ""}



    </button>)
}

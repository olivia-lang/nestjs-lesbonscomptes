import CompteInvitableItem from "./CompteInvitableItem.jsx";
import {ajouterMembres, listerCompteInvitable} from "../../../api/porte-monnaies.js";
import {useEffect, useState} from "react";

export default function InviteMembres({walletId,setErreur}){
    const [cptRefreshListInvite,setCptRefreshListInvite] = useState(1);
    const [comptesInvitable,setComptesInvitable] = useState([]);
    const [comptesInvitableFilter,setComptesInvitableFilter] = useState("");

    useEffect(()=>{
        listerCompteInvitable(walletId,comptesInvitableFilter).then(setComptesInvitable).catch((err) => setErreur(err.message));
    }, [walletId, comptesInvitableFilter, cptRefreshListInvite, setErreur]);

    return <>
        <label>Recherche par nom ou email : </label>
        <input name={"filter"} placeholder={"John Doe"} onChange={
            (e)=>setComptesInvitableFilter(e.target.value)} >

        </input>
        <div  className="list-group" >
            {comptesInvitable.filter(c=>!c.alreadyPresent && !c.alreadyInvited).length>0 ? comptesInvitable.filter(c=>!c.alreadyPresent && !c.alreadyInvited).map(
                (compteInvitable) => (
                    <CompteInvitableItem key={compteInvitable.id}
                                         {...compteInvitable}
                                         onClick={()=>ajouterMembres(walletId,[compteInvitable.id])
                                             .then((()=>setCptRefreshListInvite(cptRefreshListInvite+1)))
                                             .catch((err) => setErreur(err.message))}
                    />
                ))
            :
                <button className="list-group-item list-group-item-action small fw-medium text-start"> Aucuns résultats correspondants.</button>
            }
        </div>
    </>
}
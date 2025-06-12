import React from 'react'
import { useContext ,useState} from 'react'
import { createContext } from 'react'


let Authpower=createContext()






export const Authprovider = ({children}) => {
const [isOk, setisOk] = useState(false);
const [carddata, setcarddata] = useState([]);




		return ( <Authpower.Provider value={{isOk,setisOk,setcarddata,carddata}}>
{children}
		</Authpower.Provider>
				
		)
	}

export const useAuth = () => {
	let contextdata=useContext(Authpower)
	if(!contextdata){return }
		return contextdata
}



import React, { useState,useEffect } from 'react'
import { decode } from 'jsonwebtoken';
import {useNavigate} from 'react-router-dom';
import { getList } from './ShowroomList';
import DisplayShowoomList from './DisplayShowoomList';
import HOC from '../hoc/HOC';

import '../../css/dashboard.css';
//import React, { PureComponent } from 'react'

export default function  DisplayShowroom () {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const ListWithLoading = HOC(DisplayShowoomList);
    useEffect(() => {
        
        getList()
          .then(items => {
              console.log(items)
              if(items.status === 'ok') {
                setList(items.data);
                setLoading(false);
              }
            else 
                navigate('/login')
          })
        
    }, [navigate])
    return (
        <div style={{background:'#fff', padding:'12px'}}>
            <ListWithLoading isLoading={loading} list={list} />
            
        </div>
    )

    
}

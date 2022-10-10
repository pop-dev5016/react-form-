import { useRef,useState,useEffect } from "react";
import React from 'react'
import { faCheck,faTimes,FaInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';




const Register = () => {
    const userRef = useRef()
    const errRef= useRef()

    const [user,setUser] = useState('')
    const [validname,setValidname] = useState(false)
    const [userFocus,setUserFocus] = useState(false)


    const [pwd,setPwd] = useState('')
    const [validpwd,setValidPwd] = useState(false)
    const [pwdFocus,setPwdFocus] = useState(false)

    const [matchpwd,setMatchPwd] = useState('')
    const [validMatch,setValidMatch] = useState(false)
    const [MatchFocus,setMatchFocus] = useState(false)

    const [errmsg,SetErrMsg] = useState('')
    const [success,setSucess] = useState(false)


    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        const results = USER_REGEX.test(user)
        console.log(results)
        console.log(user)
        setValidname(results)
    },[user])

    useEffect(()=>{
        const results = PWD_REGEX.test(pwd)
        console.log(results)
        console.log(pwd)
        setValidPwd(results)
        const match = pwd === matchpwd;
        setValidMatch(match)

    },[pwd,matchpwd])


    useEffect(()=>{
        SetErrMsg("")
    },[user,pwd,matchpwd])




  return (
    <section>
        <p ref={errRef} className={errmsg?"errmsg":"offscreen"} aria-live="assertive">{errmsg}</p>
        <h1>sign in</h1>
        <form>
            <label htmlFor="username">UserName</label>
            <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validname ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />



        </form>
    </section>
  )
}

export default Register
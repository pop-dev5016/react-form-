import { useRef,useState,useEffect } from "react";
import React from 'react'
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';




const Register = () => {
    const userRef = useRef()
    const errRef= useRef()

    const [user,setUser] = useState('')
    const [validName,setValidName] = useState(false)
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
        setValidName(results)
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            SetErrMsg("Invalid Entry");
            return;
        }
        console.log(user,pwd);
        setSucess(true)
    }




  return (
    <>
      {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>

            ) : (   <section>
                                    <p ref={errRef} className={errmsg?"errmsg":"offscreen"} aria-live="assertive">{errmsg}</p>
                                    <h1>register</h1>
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="username">
                                            UserName:
                                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                                            </label>


                                        <input
                                                        type="text"
                                                        id="username"
                                                        ref={userRef}
                                                        autoComplete="off"
                                                        onChange={(e) => setUser(e.target.value)}
                                                        value={user}
                                                        required
                                                        aria-invalid={validName ? "false" : "true"}
                                                        aria-describedby="uidnote"
                                                        onFocus={() => setUserFocus(true)}
                                                        onBlur={() => setUserFocus(false)}
                                                    />


                                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                        4 to 24 characters.<br />
                                                        Must begin with a letter.<br />
                                                        Letters, numbers, underscores, hyphens allowed.
                                                    </p>



                                        <label htmlFor="password">
                                                        Password:
                                                        <FontAwesomeIcon icon={faCheck} className={validpwd ? "valid" : "hide"} />
                                                        <FontAwesomeIcon icon={faTimes} className={validpwd || !pwd ? "hide" : "invalid"} />
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        onChange={(e) => setPwd(e.target.value)}
                                                        value={pwd}
                                                        required
                                                        aria-invalid={validpwd ? "false" : "true"}
                                                        aria-describedby="pwdnote"
                                                        onFocus={() => setPwdFocus(true)}
                                                        onBlur={() => setPwdFocus(false)}
                                                    />
                                                    <p id="pwdnote" className={pwdFocus && !validpwd ? "instructions" : "offscreen"}>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                        8 to 24 characters.<br />
                                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                                        Allowed special characters: 
                                                        <span aria-label="exclamation mark">!</span> 
                                                        <span aria-label="at symbol">@</span> 
                                                        <span aria-label="hashtag">#</span>
                                                        <span aria-label="dollar sign">$</span>
                                                        <span aria-label="percent">%</span>
                                                    </p>   

                                        <label htmlFor="confirm_pwd">
                                                        Confirm Password:
                                                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchpwd ? "valid" : "hide"} />
                                                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchpwd ? "hide" : "invalid"} />
                                                    </label>
                                                    <input
                                                        type="password"
                                                        id="confirm_pwd"
                                                        onChange={(e) => setMatchPwd(e.target.value)}
                                                        value={matchpwd}
                                                        required
                                                        aria-invalid={validMatch ? "false" : "true"}
                                                        aria-describedby="confirmnote"
                                                        onFocus={() => setMatchFocus(true)}
                                                        onBlur={() => setMatchFocus(false)}
                                                    />
                                                    <p id="confirmnote" className={MatchFocus && !validMatch ? "instructions" : "offscreen"}>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                        Must match the first password input field.
                                                    </p>

                                                    <button disabled={!validName || !validpwd || !validMatch ? true : false}>Sign Up</button>                                       
                                    </form>
                                                <p>
                                                    Already registered?<br />
                                                    <span className="line">
                                                        {/*put router link here*/}
                                                        <a href="#">Sign In</a>
                                                    </span>
                                                </p>

                       </section>)}
</>


  )
}

export default Register
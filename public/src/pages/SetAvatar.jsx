import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FormContainer, LoginAcountDetail } from "./type";
import "react-toastify/dist/ReactToastify.css";

import { registerRoute } from "../utils/APIRoutes";
import axios from "axios";

import React from 'react'

const SetAvatar = () => {

    const api ="https://api.multiavatar.com/4645646";
    const navigate =useNavigate()
  return (
    <>
    
    <div className="container">SetAvatar</div>
    <ToastContainer/>
    </>
  )
}

export default SetAvatar
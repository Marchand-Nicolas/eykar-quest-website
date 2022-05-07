import { useState, useMemo } from "react";
import { useStarknet, InjectedConnector } from '@starknet-react/core'
import styles from '../styles/Quests.module.css'
import React from 'react'
import { useRouter } from 'next/router'
import Header from '../components/header' 
import { waitForElm, getCookie, setCookie } from "../functions";
import Popup from '../components/popup'

export default function Home() {;
  const [connectMenuToggled, setConnectMenuToggled] = useState(false);
  let [connectionStatus, setConnectionStatus]  = useState(0) 
  const { account, connect, connectors } = useStarknet()
  const router = useRouter()  
  const injected = useMemo(() => new InjectedConnector(), [])
  let [triedQuests, setTriedQuests] = useState(false) 
  useMemo(
    async () => { try {
      await waitForElm(".default_background")
      if (connectors.length !== 0) {
          connectors[0].ready().then(ready => {
            if (ready) connect(connectors[0])
        })
      } 
      setTriedQuests(getCookie("triedQuests"))
      document.querySelector("body").style.overscrollBehaviorY = "contain"
      let beginX = 0
      let beginY = 0
      let x = -50
      let y = window.innerHeight / 2
      await waitForElm("#questsContener")
      move(0, 0)
      function move(moveX, moveY) {
        x =  x + moveX - beginX
        beginX = moveX
        y = y + moveY - beginY
        beginY = moveY
        document.getElementById("questsContener").style.left = x + "px"
        document.getElementById("questsContener").style.top = y + "px"
      } 
      document.addEventListener("touchstart", (e) => {
        beginX = e.changedTouches[0].pageX
        beginY = e.changedTouches[0].pageY
      });
      document.addEventListener("touchmove", (e) => {
        move(e.changedTouches[0].pageX, e.changedTouches[0].pageY)
      });
      let mousePressed = false
      document.addEventListener("mousedown", (e) => {
        beginX = e.clientX
        beginY = e.clientY
        mousePressed = true
      });
      document.addEventListener("mouseup", (e) => {
        mousePressed = 0
      });
      document.addEventListener("mousemove", (e) => {
        if (!mousePressed) return
        move(e.clientX, e.clientY)
      });
  } catch{}
  } ,
    []
  );
  const quests = [{
    name: "Eligibility",
    description: "Let's check if you have the prerequisites to join the future beta of Eykar!",
    icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>,
    connected: [{
      name: "Tweet",
      description: "Make a tweet mentioning Eykar to support us ❤️",
      icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
</svg>,
    }
  ] 
  }]
  function leavePoint(pointId) {
    const pointInfos = document.getElementById("content_" + pointId)
    if (!pointInfos) return
    pointInfos.remove()
  }
  function hoverPoint(quest, pointId) {
    const point = document.getElementById(pointId)
    if (document.getElementById("content_" + pointId)) return
    const pointInfos = document.createElement("div")
    pointInfos.id = "content_" + pointId
    pointInfos.innerHTML = `<p>${quest.description}</p>`
    pointInfos.className = styles.point_infos_contener
    point.appendChild(pointInfos)
  }
  function parseBranch(quest, elementPos, Y) {
    return <div onMouseDown={() => hoverPoint(quest, "point_" + elementPos + "_" + Y)} onMouseEnter={() => hoverPoint(quest, "point_" + elementPos + "_" + Y)} onMouseLeave={() => leavePoint("point_" + elementPos + "_" + Y)} className={styles.quest_point_contener} style={{left : elementPos, transform: `translateY(calc(-50% + ${Y}px))`}}>
        <p className={styles.quest_point_name}>{quest.name}</p>
        <div id={"point_" + elementPos + "_" + Y} className={styles.quest_point}>
          {quest.icon} 
        </div>
      </div>
  } 
  function loadBranch(quest, pos, Y) {
    const elementPos = pos + 150
    if (!quest.connected) return parseBranch(quest, elementPos, Y)
    function computeChildY(index) {
      if (quest.connected.length === 1) return Y
      return Y + 200 / (quest.connected.length - 1) * (index) - 100
    } 
    return <div>
      {parseBranch(quest, elementPos, Y)}
      <div style={{left: elementPos, transform: `translateY(calc(-50% + ${Y}px))`}} className={styles.horizontalLine}></div>
      {quest.connected.length > 1 && <div style={{left: elementPos, transform: `translateY(calc(-50% + ${Y}px)) translateX(150px)`}} className={styles.verticalLine}></div>} 
      {quest.connected.map((element, index) => 
        <div key={"branch_" + quest.name + "_" + index}>
          {loadBranch(element, elementPos, computeChildY(index))}
        </div>
      )}  
    </div>
  }  
  return (
    <div className="default_background">
      {account && <Header/>} 
      {triedQuests ? null : Popup("Welcome to the quest system!", `Press the left mouse button and move it (or your finger on phones and tablets) to move through the list of quests,\n then click on one of them (a white circle) to start completing it.`,
      "Okay", function(){return setCookie("triedQuests", true, 10000)})} 
      <div id="questsContener" className={styles.contener}>
      {loadBranch(quests[0], 0, 0)}  
     </div>
    </div>
  );
}
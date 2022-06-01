import { waitForElm, getCookie, setCookie } from "../functions";
import { render, unmountComponentAtNode } from "react-dom";
import { useEykarCommunityContract } from '../hooks/eykarCommunity'
import { useStarknetInvoke, useStarknetCall, useStarknet, useStarknetTransactionManager } from '@starknet-react/core'
import { useState, useEffect, useMemo } from "react";
import { useDisplayName } from "../hooks/starknet";
import LoadingScreen from "../components/loadingScreen";
import styles from '../styles/Quests.module.css'
import React from 'react'
import Header from '../components/header' 
import Popup from '../components/popup'

export default function Home() {
  const { account, connect, connectors } = useStarknet()
  const { contract } = useEykarCommunityContract()
  const { data:mintFirstNFTData, loading:mintFirstNFTLoading, error:mintFirstNFTError, reset:mintFirstNFTReset, invoke:mintFirstNFTInvoke } = useStarknetInvoke({ contract, method: 'mintFirstNFT'})
  const { data:playerLevel, loading:playerLevelLoading, error:playerLevelError, refresh:playerLevelRefresh } = useStarknetCall({ contract, method: 'getLevel', args: [] })
  //const { data:questProgress, loading:questProgressLoading, error:questProgressError, refresh:questProgressRefresh } = useStarknetCall({ contract, method: 'getProgress', args: [12] })
  const [questCompleted, setQuestCompleted] = useState(false)
  const [questAction, setQuestAction] = useState("")
  const [questActionDescription, setQuestActionDescription] = useState("")
  const [questActionContent, setQuestActionContent] = useState("")
  const [questActionTransaction, setQuestActionTransaction] = useState(null)
  const { transactions } = useStarknetTransactionManager()
  const [questProgress, setQuestProgress] = GetQuestProgress(12);
  function GetQuestProgress(questNumber) {
    const [result, setResult] = useState([]);
    useEffect(() => {
      async function getQuestProgress() {
        let questProgressTemp = []
        if (contract && account && questProgress.length === 0) questProgressTemp = await contract.functions.getProgress(12)
        else if (questProgress.length === 0) questProgressTemp = questProgress
        setResult(questProgressTemp);
      }
      if (questProgress.length === 0 && account && contract) getQuestProgress()
    }, [questNumber, contract, account])
    return [result]
  }
  const playerName = useDisplayName(account, 12, 4);
  useEffect(() => {
      for (const transaction of transactions)
          if (transaction.transactionHash === mintFirstNFTData) {
              setQuestActionTransaction(transaction)
              if (transaction.status === 'ACCEPTED_ON_L2'
                  || transaction.status === 'ACCEPTED_ON_L1')
                  setQuestCompleted(true);
          }
  }, [mintFirstNFTData, transactions])
  async () => {
  try {
      invoke({ args: [] })
  } catch(e) {console.log(e)}
  }
  useMemo(
    async () => {
      try {
        setTimeout(() => {
          if (typeof window === "undefined") return
          if (connectors.length === 0) return
            const connector = connectors[0]
              connector.ready().then(ready => {
              if (ready) connect(connectors[0])
            }) 
      }, 50);
    } catch{}
  },
  []
  );
  useMemo(
    async () => { try {
      await waitForElm("#questsContener")
      !getCookie("triedQuests") && Popup("Welcome to the quest system!", `Press the left mouse button and move it (or your finger on phones and tablets) to move through the list of quests,\n then click on one of them (a white circle) to start completing it.`,
      "Okay", function(){return setCookie("triedQuests", true, 10000)})
      document.querySelector("body").style.overscrollBehaviorY = "contain"
      let beginX = 0
      let beginY = 0
      let x = -10
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
    name: "First NFT",
    id: 1,
    description: "We'll mint your first NFT on Eykar!",
    long_description: "Let's mint your first NFT on Eykar! You will keep it throughout your journey. As you complete quests (like this one), your NFT will gain levels and evolve! Good luck ;-)",
    icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>,
    custom_button: "Mint",
    action : function(){
      setQuestCompleted(false)
      setQuestActionTransaction(null)
      mintFirstNFTInvoke({ args: [] })
      setQuestAction("Minting your first NFT")
      setQuestActionDescription("Please wait...")
      setQuestActionContent(<button className="global button highlighted popup v2">Close</button>)
    },
    connected: [{
    name: "Eligibility",
    id: 2,
    description: "Let's check if you have the prerequisites to join the future beta of Eykar!",
    long_description: "",
    dependent: true,
    icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>,
      action : function(){
      },
        connected: [{
          name: "Tweet",
          id: 3,
          description: "Make a tweet mentioning Eykar to support us ❤️",
          long_description: "Make a tweet containing at least @AgeOfEykar or eykar.org, with more than 50 characters.",
          content: <>
                <input className="global input" placeholder="Please enter your exact twitter username"></input>
                <br></br>
                <p className="global description">After the tweet is sent, you have 10 minutes to click on the button below</p>
            </>,
            icon: <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>,
          action : function(){
            console.log("tweet")
          },
          dependent: true
        }
      ] 
      }]
  }]
  async function hoverPoint(quest, pointId) {
    const point = document.getElementById(pointId)
    const pointContener = document.getElementById("contentContener_" + pointId)
    const questCompleted = questProgress.length > 0 ? questProgress[0][quest.id - 1].words[0] : false
    render(
      <>
        <p id={"content_" + pointId}>{quest.description}</p>
        {
        !questCompleted ? <button onClick={() => {
            Popup(
              quest.name,
              quest.long_description,
              quest.custom_button ? quest.custom_button : "Done",
              quest.action,
              quest.content,
            )
        }} className={`global button dark ${styles.quest_start_button}`}>Start</button> : <button className={`global button dark ${styles.quest_start_button} ${styles.quest_start_button_completed}`}>Completed</button>
        }
      </>,
      pointContener
    )
    let check = setInterval(() => {
      if (point.matches(':hover') || point.matches(':focus')) return
      clearInterval(check)
      unmountComponentAtNode(pointContener)
    }, 50);
  }
  function parseBranch(quest, elementPos, Y, previousQuestCompleted) {
    const completed = questProgress.length > 0 ? questProgress[0][quest.id - 1].words[0] : false
    return <div onMouseDown={() => quest.dependent && !previousQuestCompleted ? null : hoverPoint(quest, "point_" + elementPos + "_" + Y)} onMouseEnter={() => quest.dependent && !previousQuestCompleted ? null : hoverPoint(quest, "point_" + elementPos + "_" + Y)} id={"point_" + elementPos + "_" + Y} className={[styles.quest_point_contener, completed ? styles.quest_point_contener_completed : null].join(" ")} style={{left : elementPos, transform: `translateY(calc(-50% + ${Y}px))`}}>
        {quest.dependent && !previousQuestCompleted ? null : <p className={styles.quest_point_name}>{quest.name}</p>}
        <div id={"questElement_" + quest.id} className={[styles.quest_point, quest.dependent && !previousQuestCompleted ? styles.quest_point_locked : null].join(" ")}>
          {
            completed ? <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> : quest.dependent && !previousQuestCompleted ? <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg> : quest.icon
          }
          {quest.dependent && !previousQuestCompleted ? null : <div className={styles.point_infos_contener} id={quest.name && "contentContener_point_" + elementPos + "_" + Y}></div>}
        </div>
      </div>
  }
  function loadBranch(quest, pos, Y, previousQuestCompleted) {
    const elementPos = pos + 150
    if (!quest.connected) return parseBranch(quest, elementPos, Y, previousQuestCompleted)
    function computeChildY(index) {
      if (quest.connected.length === 1) return Y
      return Y + 200 / (quest.connected.length - 1) * (index) - 100
    } 
    return <div>
      {parseBranch(quest, elementPos, Y, previousQuestCompleted)}
      <div style={{left: elementPos, transform: `translateY(calc(-50% + ${Y}px))`}} className={styles.horizontalLine}></div>
      {quest.connected.length > 1 && <div style={{left: elementPos, transform: `translateY(calc(-50% + ${Y}px)) translateX(150px)`}} className={styles.verticalLine}></div>} 
      {quest.connected.map((element, index) => 
        <div key={"branch_" + quest.name + "_" + index}>
          {loadBranch(element, elementPos, computeChildY(index), questProgress.length > 0 ? questProgress[0][quest.id - 1].words[0] : false)}
        </div>
      )}  
    </div>
  }
      
  return (
    <div className="default_background">
      {account && <Header/>} 
      <div id="questsContener" className={styles.contener}>
      {loadBranch(quests[0], 0, 0, true)}  
      {account && <div className={styles.player_infos_contener}>
        <p>{playerName}</p>
        Level {account ? (playerLevel ? playerLevel[0].words[0] : "...") : 0}
        </div>}
      </div>
      {
        (!questCompleted && questAction) ? <LoadingScreen title={questAction} description={questActionTransaction ? questActionDescription : "Please confirm the transaction"} content={
          <>
            <p className={[styles.transaction_status, questActionTransaction && (questActionTransaction.status === "REJECTED" && styles.transaction_status_rejected)].join(" ")}>{questActionTransaction ? "Current status : " + questActionTransaction.status : "..."}</p>
            <button onClick={() => setQuestAction("")} className="global button highlighted popup v2">
              Close
            </button>
          </>
        }/> : null
      }
    </div>
  );
}
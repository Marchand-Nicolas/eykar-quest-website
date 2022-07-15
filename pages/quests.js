import { waitForElm, getCookie, setCookie } from "../functions";
import { render, unmountComponentAtNode } from "react-dom";
import { useEykarCommunityContract } from '../hooks/eykarCommunity'
import { useStarknetInvoke, useStarknet, useStarknetTransactionManager } from '@starknet-react/core'
import { useState, useEffect, useMemo } from "react";
import styles from '../styles/Quests.module.css'
import React from 'react'
import Header from '../components/header' 
import Popup from '../functions/popup'
import Notification from "../components/notification";
import quests from '../utils/questList'
import QuestTransactionMenu from '../components/questTransactionMenu'
import QuestSteps from "../components/quests/questSteps";

export default function Home() {
  const { account, connect, connectors } = useStarknet()
  const { contract } = useEykarCommunityContract()
  const [questCompleted, setQuestCompleted] = useState(false)
  const [questAction, setQuestAction] = useState("")
  const [questActionDescription, setQuestActionDescription] = useState("")
  const [questActionContent, setQuestActionContent] = useState("")
  const [questProgress, playerLevel] = GetQuestProgress(12);
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const [ currentTransactionType, setCurrentTransactionType ] = useState(null)
  const [ menu, setMenu ] = useState(null)
  const { transactions } = useStarknetTransactionManager()

  const { data:mintFirstNFTData, mintFirstNFTLoading, error:mintFirstNFTError, reset:mintFirstNFTReset, invoke:mintFirstNFT } = useStarknetInvoke({ contract, method: 'mintFirstNFT'})

  useEffect(() => {
    if (!currentTransactionType) return
    let transactionHash = undefined
    switch (currentTransactionType) {
      case 1:
        transactionHash= mintFirstNFTData
      break;
    }
    if (!transactionHash) return
    for (const transaction of transactions)
        if (transaction.transactionHash === transactionHash) {
          setCurrentTransaction(transaction)
          if (transaction.status === 'ACCEPTED_ON_L2' || transaction.status === 'ACCEPTED_ON_L1') {
            setQuestCompleted(true)
          }
        }
}, [currentTransaction, transactions])

  // load player progress
  function GetQuestProgress(questNumber) {
    const [progress, setProgress] = useState([]);
    const [level, setLevel] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      async function getPlayerInfos() {
        setLoading(true);
        if (questAction) {
          setQuestAction('');
          setQuestCompleted(false);
        }
        let questProgressTemp = [];
        questProgressTemp = await contract.functions.getProgress(12, account)
        setProgress(questProgressTemp);
        let levelTemp = 0
        levelTemp = await contract.functions.getLevel(account)
        setLevel(levelTemp);
        setLoading(false);
      }
      if ((questAction && questCompleted || questProgress.length === 0) && !loading && account && contract) getPlayerInfos()
    }, [questNumber, contract, account, questCompleted])
    return [progress, level, questCompleted, questAction]
  }
  useMemo(
    async () => { try {
      if (typeof window !== "undefined") {
        // connect player wallet
        setTimeout(() => {
          if (connectors.length === 0) return
          const connector = connectors[0]
          connector.ready().then(ready => {
            if (ready) connect(connectors[0])
          }) 
        }, 150);
      }
      // mouse movement system
      const questContainer = await waitForElm("#questsContainer")
      !getCookie("triedQuests") && Popup("Welcome to the quest system!", `Press the left mouse button and move it (or your finger on phones and tablets) to move through the list of quests,\n then click on one of them (a circle) to start completing it.`,
      "Okay", function(){return setCookie("triedQuests", true, 10000)})
      document.querySelector("body").style.overscrollBehaviorY = "contain"
      let beginX = 0
      let beginY = 0
      let x = -10
      let y = window.innerHeight / 2
      let zoom = 1
      await waitForElm("#questsContainer")
      move(0, 0)
      function move(moveX, moveY) {
        if (!questContainer) return
        x =  x + moveX - beginX
        beginX = moveX
        y = y + moveY - beginY
        beginY = moveY
        questContainer.style.left = x + "px"
        questContainer.style.top = y + "px"
      } 
      document.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
          zoom = zoom * 1.1
        }
        if (e.deltaY > 0) {
          zoom = zoom / 1.1
        }
        questContainer.style.transform = `scale(${zoom})`
      });
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

  // show a menu when a quest is hovered
  async function hoverPoint(quest, pointId) {
    const point = document.getElementById(pointId)
    const pointContener = document.getElementById("contentContener_" + pointId)
    const questCompleted = questProgress.length > 0 ? questProgress[0][quest.id - 1].words[0] : false
    render(
      <>
        <p id={"content_" + pointId}>{quest.description}</p>
        {
          quest.devOnly ? <button className={`global button dark ${styles.quest_start_button} ${styles.quest_start_button_locked}`}>Unavailable</button> :
          !questCompleted ? <button onClick={() => {
            switch (quest.transactionType) {
              case 1:
                mintFirstNFT({ args: [] })
                setQuestAction("Minting your first NFT")
                setQuestActionDescription("Please wait...")
                setQuestActionContent(<button onClick={() => setQuestAction("")} className="global button highlighted popup v2">Close</button>)
                setCurrentTransaction(null)
                setCurrentTransactionType(quest.transactionType)
                Notification({message:"The Goerli network is overloaded, leading to long delays in completing transactions. You can close this page and come back in 10 minutes.", warning: true})
              break;
              default: setMenu(
                <div className="global popup contener">
                    <div id="closeButtonContainer">
                      <svg onClick={() => setMenu(null)} className='global popup close' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h1 className="global popup title">{quest.name}</h1>
                    <p className="global popup description">{quest.description}</p>
                    {quest.content}
                    {
                      <QuestSteps quest={quest} completeQuest={completeQuest} />
                    }
                  </div>
                )
              }
              function completeQuest() {
                setMenu(null)
                setQuestAction('-')
                setQuestCompleted(true)
                Notification({message:"Quest completed", icon:"/icons/medals.svg"})
                if (quest.actionType === "invoke") {
                  switch (quest.transactionType) {
                    case 2:

                    break;
                    default:
                  }
                }
              }
          }} className={`global button dark ${styles.quest_start_button}`}>Start</button> : <button className={`global button dark ${styles.quest_start_button} ${styles.quest_start_button_completed}`}>Completed</button>
        }
      </>,
      pointContener)
    let check = setInterval(() => {
      if (point.matches(':hover') || point.matches(':focus')) return
      clearInterval(check)
      unmountComponentAtNode(pointContener)
    }, 50);
  }

  // process quest datas
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
      {quest.connected.length > 1 && <div style={{left: elementPos, transform: `translateY(calc(-50% + ${Y}px)) translateX(150px)`}} className={[styles.verticalLine, quest.connected[0].clear ? styles.bottom : quest.connected[quest.connected.length - 1].clear ? styles.top : null].join(" ")} />}
      {quest.connected.map((element, index) => 
        <div key={"branch_" + quest.name + "_" + index}>
          {loadBranch(element, elementPos, computeChildY(index), quest.name ? questProgress.length > 0 ? quest.id ? questProgress[0][quest.id - 1].words[0] : true : false : previousQuestCompleted)}
        </div>
      )}  
    </div>
  }

    // convert quest datas to html
    function parseBranch(quest, elementPos, Y, previousQuestCompleted) {
      if (!quest.name) return null
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

  return (
    <div className="default_background">
      {account && <Header/>}
      <div id="questsContainer" className={styles.contener}>
      {loadBranch(quests[0], 0, 0, true)}  
      {account && <div className={styles.player_infos_contener}>
        <img src={`https://nft.eykar.org/quest-nft/${playerLevel ? playerLevel[0].words[0] : 0}`} />
        <p>Level {playerLevel ? playerLevel[0].words[0] : 0}</p>
      </div>}
      </div>
      {menu}
      {(questAction && !questCompleted) ? <QuestTransactionMenu content={questActionContent} questCompleted={questCompleted} questAction={questAction} questActionDescription={questActionDescription} transaction={currentTransaction} /> : null}
    </div>
  );
}
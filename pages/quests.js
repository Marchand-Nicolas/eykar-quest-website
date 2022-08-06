import { waitForElm, getCookie, setCookie } from "../functions";
import { render, unmountComponentAtNode } from "react-dom";
import { useEykarCommunityContract } from '../hooks/eykarCommunity'
import { useStarknetInvoke, useStarknet, useConnectors, useStarknetTransactionManager } from '@starknet-react/core'
import { useState, useEffect, useMemo } from "react";
import styles from '../styles/Quests.module.css'
import React from 'react'
import Header from '../components/header' 
import Popup from '../utils/popup'
import Notification from "../components/notification";
import quests from '../utils/questList'
import QuestTransactionMenu from '../components/questTransactionMenu'
import QuestSteps from "../components/quests/questSteps";
import Loading from "../components/loading";
import waitForIndexation from "../utils/waitForIndexation";
import WalletMenu from "../components/walletmenu";

export default function Home() {
  const { connect, connectors } = useConnectors()
  const { account } = useStarknet()
  const { contract } = useEykarCommunityContract()
  const [questCompleted, setQuestCompleted] = useState(false)
  const [questAction, setQuestAction] = useState("")
  const [questActionDescription, setQuestActionDescription] = useState("")
  const [questActionContent, setQuestActionContent] = useState("")
  const [loadingDatas, setLoadingDatas] = useState(false);
  const [ tokenId, setTokenId ] = useState(undefined)
  const [ token, setToken ] = useState(undefined)
  const [ tokens, setTokens ] = useState(undefined)
  const [ tokenIds, setTokenIds ] = useState(undefined)
  const [ reloadDatas, setReloadDatas ] = useState(false)
  const [ reloadTokens, setReloadTokens ] = useState(false)
  const [ questProgress, playerLevel ] = GetQuestProgress(12)
  const [ currentTransaction, setCurrentTransaction ] = useState(null)
  const [ currentTransactionType, setCurrentTransactionType ] = useState(null)
  const [ menu, setMenu ] = useState(null)
  const [ canCompleteQuest, setCanCompleteQuest ] = useState(false)
  const { transactions } = useStarknetTransactionManager()

  const { data:mintNFTData, invoke:mintNFT } = useStarknetInvoke({ contract, method: 'mintNFT'})

  const date = new Date()
  const beginingDate = 1659106966150
  const maxQuest = Math.floor((date.getTime() - beginingDate) / 1000 / 3600 / 24 / 7) + 4
  const daysLeftBeforeQuest = ((beginingDate + 1000 * 3600 * 24 * 7 + (maxQuest - 4) * 1000 * 3600 * 24 * 7) - date.getTime()) / 1000 / 3600 / 24
  useEffect(() => {
    setCanCompleteQuest(playerLevel < maxQuest)
  }, [tokenId, playerLevel, maxQuest])

  useEffect(() => {
    const connectorId = getCookie("connector")
    const connector = connectors.find(connector => connector.id() === connectorId)
    if (!connector) return console.log(connectors);
    connector.ready().then(ready => {
      connect(connector)
    }) 
  }, [connectors])

  useEffect(async () => {
    if (!currentTransactionType) return
    let transactionHash = undefined
    switch (currentTransactionType) {
      case 1:
        transactionHash= mintNFTData
      break;
    }
    if (!transactionHash) return
    for (const transaction of transactions)
        if (transaction.transactionHash === transactionHash) {
          setCurrentTransaction(transaction)
          if (transaction.status === 'ACCEPTED_ON_L2' || transaction.status === 'ACCEPTED_ON_L1') {
            setQuestCompleted(true)
            switch (currentTransactionType) {
              case 1:
                if (!token) waitForIndexation(account, contract, setToken, setTokenIds, setTokenId, setReloadDatas)
              break;
            }
          }
        }
}, [currentTransaction, transactions])

  useEffect(() => {
    if (account)
    try {
      if (reloadTokens) setReloadTokens(false)
      fetch(`https://api-testnet.aspect.co/api/v0/assets?owner_address=${account}&contract_address=${contract.address}&sort_by=minted_at&order_by=asc`).then(res => res.json()).then(res => {
      setTokens(res.assets)
        const assets = res.assets.map(asset => asset.token_id)
        setToken(res.assets[0])
        setTokenIds(assets)
        setTokenId([assets[0], 0])
      })
    } catch (error) {
      Notification({message:"The Aspect api is currently unavailable. Please check back later.", warning: true})
      throw(error)
    }
  }, [account, reloadTokens])

  // load player progress
  function GetQuestProgress(questNumber) {
    const [progress, setProgress] = useState([]);
    const [level, setLevel] = useState(0);
    useEffect(() => {
      async function getPlayerInfos() {
        setReloadDatas(false)
        setLoadingDatas(true);
        if (questAction) {
          setQuestAction('');
          setQuestCompleted(false);
        }
        let questProgressTemp = [];
        questProgressTemp = await contract.functions.getProgress(12, tokenId)
        setProgress(questProgressTemp);
        let levelTemp = 0
        levelTemp = await contract.functions.getLevel(tokenId)
        setLevel(levelTemp);
        setLoadingDatas(false);
      }
      if (((questAction && questCompleted) || questProgress.length === 0 || reloadDatas) && !loadingDatas && account && contract && tokenId ? tokenId[0] : false) getPlayerInfos()
    }, [questNumber, contract, account, questCompleted, tokenId, reloadDatas])
    return [progress, level, questCompleted, questAction]
  }
  useMemo(
    async () => { try {
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
          !questCompleted ? 
          quest.devOnly || !canCompleteQuest ? <button className={`global button dark ${styles.quest_start_button} ${styles.quest_start_button_locked}`}>Please wait</button> :
          <button onClick={() => {
            switch (quest.transactionType) {
              case 1:
                mintNFT({ args: [] })
                setQuestAction("Minting your first NFT")
                setQuestActionDescription("Please wait...")
                setQuestActionContent(<button onClick={() => setQuestAction("")} className="global button highlighted popup v2">Close</button>)
                setCurrentTransaction(null)
                setCurrentTransactionType(quest.transactionType)
                Notification({message:"The Goerli network is slow, it is normal to wait a few minutes for the transaction to be completed", warning: true})
              break;
              default: setMenu(
                <div className="global popup contener">
                    <div id="closeButtonContainer">
                      <svg onClick={() => {setMenu(null);refresh()}} className='global popup close' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <h1 className="global popup title">{quest.name}</h1>
                    <p className="global popup description">{quest.description}</p>
                    {quest.content}
                    {
                      <QuestSteps tokenId={tokenId} quest={quest} completeQuest={completeQuest} />
                    }
                  </div>
                )
              }
              function refresh() {
                setReloadDatas(true)
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
      return <div onMouseDown={() => quest.dependent && !previousQuestCompleted ? null : hoverPoint(quest, "point_" + elementPos + "_" + Y)} onMouseEnter={() => quest.dependent && !previousQuestCompleted ? null : hoverPoint(quest, "point_" + elementPos + "_" + Y)} id={"point_" + elementPos + "_" + Y} className={[styles.quest_point_contener, completed ? styles.quest_point_contener_completed : !canCompleteQuest ? styles.quest_point_contener_unavailable : null].join(" ")} style={{left : elementPos, transform: `translateY(calc(-50% + ${Y}px))`}}>
          {quest.dependent && !previousQuestCompleted ? null : <p className={styles.quest_point_name}>{quest.name}</p>}
          <div id={"questElement_" + quest.id} className={[styles.quest_point, quest.dependent && !previousQuestCompleted ? styles.quest_point_locked : null].join(" ")}>
            {
              completed ? <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> : quest.dependent && !previousQuestCompleted ? <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg> : canCompleteQuest ? quest.icon : <svg className={styles.quest_point_icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            }
            {quest.dependent && !previousQuestCompleted ? null : <div className={styles.point_infos_contener} id={quest.name && "contentContener_point_" + elementPos + "_" + Y}></div>}
          </div>
        </div>
    }
  return (
    <div className="default_background">
      {account && <Header/>}
      <div id="questsContainer" className={styles.contener}>
      {
        tokenIds && tokenIds.length > 1 && <div className={styles.tokensContainer}>
            {
              tokenIds.map((tokenId, index) => 
                <div onClick={() => {
                  setToken(tokens.find(token => token.token_id === tokenId))
                  setTokenId([tokenId, 0])
                  setReloadDatas(true)
                }} className={styles.token} key={"token_" + index}>
                  {index}
                </div>
              )
            }
        </div>
      }
      {loadBranch(quests[0], tokenIds && tokenIds.length > 1 ? 50 : 0, 0, true)}  
      {token && <div className={styles.player_infos_contener}>
        <img src={`https://nft.eykar.org/quest-nft/${playerLevel ? playerLevel[0].words[0] : 0}`} />
        <p>Level {playerLevel ? playerLevel[0].words[0] : 0}</p>
        <button>
          <a href={token ? token.aspect_link : "#"} target={"_blank"} rel="noreferrer">
            <img src="/logos/aspect.png" />
          </a>
        </button>
      </div>}
      </div>
      {menu}
      {(questAction && !questCompleted) ? <QuestTransactionMenu content={questActionContent} questCompleted={questCompleted} questAction={questAction} questActionDescription={questActionDescription} transaction={currentTransaction} /> : null}
      {loadingDatas && <Loading className={styles.loading} />}
      {
        !canCompleteQuest && <div key={"notification_" + Math.random()}>
          <div className={styles.Warningcontainer}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
              <h2>You have completed the maximum number of quests for the moment. You will be able to do one more in {Math.floor(daysLeftBeforeQuest)} days and {Math.floor((daysLeftBeforeQuest - Math.floor(daysLeftBeforeQuest)) * 24)} hours.</h2>
          </div> 
        </div>
      }
      {
        !account && <WalletMenu />
      }
    </div>
  );
}
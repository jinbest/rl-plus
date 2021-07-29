import React, { useState } from 'react'
import config from "../../static/config.json"

const BotControl = () => {
  const thisPage = _.cloneDeep(config.botControl)

  const [trads, setTrads] = useState(["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"]);
  const [channels, setChannels] = useState([
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
    ["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"],
  ])
  return (
    <div className="bot-control-wrapper">
      <div className="ad"></div>
      <div className="content">
        <div className="content-item border-yellow">
          <p className="title">
            {thisPage.generalSetting.title}
          </p>
        </div>
        {
          thisPage.generalSetting.content.map((text, key) => (
            <div className={`content-item flex ${thisPage.generalSetting.content.length > key + 1 && 'border-gray'}`}>
              <p>{ text }</p>
            </div>
          ))
        }
      </div>
      <div className="content">
        <div className="content-item border-yellow">
          <p className="title">
            {thisPage.trade.title}
          </p>
        </div>
        <div className="content-item flex flex-wrap">
          {
            trads.map(trade => (
              <div className="item-piece flex">
                <p>{trade}</p>
                <div className="close_button">
                  <img src="/img/reputation/close.svg"/>
                </div>
              </div>
            ))
          }
        </div>
        <div className="content-item"></div>
      </div>
      <div className="content">
        <div className="content-item border-yellow">
          {thisPage.commandSetting.title}
        </div>
        {
          thisPage.commandSetting.content.map((content, key) => (
            <div className={`content-item ${thisPage.commandSetting.content.length > key + 1 && 'border-gray'}`}>
              <p className="font-18">!{ content }</p>
              <div className="channels-wrapper">
                <p className="font-12 font-normal allowed">Allowed Channels</p>
                <div className="flex flex-wrap">
                  {
                    channels[key].map((channel, key) => (
                      <div className="item-piece flex">
                        <p>{channel}</p>
                        <div className="close_button">
                        <img src="/img/reputation/close.svg"/>
                      </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BotControl;
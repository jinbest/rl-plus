import React, { useState } from "react"
import config from "../../static/config.json"
import _ from "lodash"
import { Checkbox } from "semantic-ui-react"
import { Icon } from "semantic-ui-react"
import { Dropdown } from "semantic-ui-react"

const SELECT_OPTIONS = [
  {
    key: 1,
    text: "rl-trading-xbox",
  },
  {
    key: 2,
    text: "rl-trading-pc",
  },
  {
    key: 3,
    text: "rl-trading-ps4",
  },
  {
    key: 4,
    text: "random-channel",
  },
  {
    key: 5,
    text: "Whoa",
  },
  {
    key: 6,
    text: "Cool",
  },
  {
    key: 7,
    text: "long-channel-n",
  },
]

type SelectOptionParam = {
  key: number
  text: string
}

const BotControl = () => {
  const thisPage = _.cloneDeep(config.botControl)

  const [trads, setTrads] = useState(["rl-trading-pc", "rl-trading-ps4", "rl-trading-xbox"])
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
  const [selectChannel, setSelectChannel] = useState(-1)
  const [tradeSelect, setTradeSelect] = useState(false)

  return (
    <div className="bot-control-wrapper">
      <div className="ad"></div>
      <div className="content">
        <div className="content-item border-yellow">
          <p className="title">{thisPage.generalSetting.title}</p>
        </div>
        {thisPage.generalSetting.content.map((text: string, index: number) => (
          <div
            key={index}
            className={
              thisPage.generalSetting.content.length > index + 1
                ? "general-setting-rl-tracker border-gray"
                : "general-setting-rl-tracker"
            }
          >
            <div>
              <p>{text}</p>
              <Checkbox />
            </div>
          </div>
        ))}
      </div>
      <div className="content">
        <div className="content-item border-yellow">
          <p className="title">{thisPage.trade.title}</p>
        </div>
        <div className="content-item flex flex-wrap">
          {trads.map((trade: string, index: number) => (
            <div className="item-piece flex" key={index}>
              <p>{trade}</p>
              <div
                className="close_button"
                onClick={() => {
                  trads.splice(index, 1)
                  setTrads([...trads])
                }}
              >
                <img src="/img/reputation/close.svg" />
              </div>
            </div>
          ))}
          {tradeSelect ? (
            <div className="bot-control-add-select">
              <Dropdown text="Select Channel">
                <Dropdown.Menu>
                  {SELECT_OPTIONS.map((item: SelectOptionParam) => (
                    <Dropdown.Item
                      text={item.text}
                      key={item.key}
                      onClick={() => {
                        trads.push(item.text)
                        setTrads([...trads])
                        setTradeSelect(false)
                      }}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <></>
          )}
          <div
            className="item-piece icon_plus_button"
            onClick={() => {
              setTradeSelect(true)
            }}
          >
            <Icon name="plus" />
          </div>
        </div>
        <div className="content-item"></div>
      </div>
      <div className="content">
        <div className="content-item border-yellow">{thisPage.commandSetting.title}</div>
        {thisPage.commandSetting.content.map((content: string, index: number) => (
          <div
            key={index}
            className={
              thisPage.commandSetting.content.length > index + 1
                ? "content-item border-gray"
                : "content-item"
            }
          >
            <p className="font-18">!{content}</p>
            <div className="channels-wrapper">
              <p className="font-12 font-normal allowed">Allowed Channels</p>
              <div className="flex flex-wrap">
                {channels[index].map((channel: string, idx: number) => (
                  <div className="item-piece flex" key={`${index}-${idx}`}>
                    <p>{channel}</p>
                    <div
                      className="close_button"
                      onClick={() => {
                        channels[index].splice(idx, 1)
                        setChannels([...channels])
                      }}
                    >
                      <img src="/img/reputation/close.svg" />
                    </div>
                  </div>
                ))}
                {selectChannel === index ? (
                  <div className="bot-control-add-select">
                    <Dropdown text="Select Channel">
                      <Dropdown.Menu>
                        {SELECT_OPTIONS.map((item: SelectOptionParam) => (
                          <Dropdown.Item
                            text={item.text}
                            key={item.key}
                            onClick={() => {
                              channels[index].push(item.text)
                              setChannels([...channels])
                              setSelectChannel(-1)
                            }}
                          />
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <></>
                )}
                <div
                  className="item-piece icon_plus_button"
                  onClick={() => {
                    setSelectChannel(index)
                  }}
                >
                  <Icon name="plus" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BotControl

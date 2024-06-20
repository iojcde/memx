'use client'
import { useState } from 'react'

const Callout = ({ title, type, collapse, defaultState, children }) => {
    const [collapsed, setCollapsed] = useState(defaultState != `expanded`)

    return (
        <blockquote
            className={`callout  not-prose ${type} ${collapse}`}
            data-callout={type}
        >
            <div className="callout-title  leading-[25.6px]">
                <div className="callout-icon"></div>
                <div
                    className="callout-title-inner"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                {collapse == `true` && (
                    <button
                        className="fold-callout-icon"
                        onClick={() => setCollapsed(!collapsed)}
                    ></button>
                )}
            </div>

            {!collapse || !collapsed ? (
                <div className="callout-content pb-4">{children}</div>
            ) : null}
        </blockquote>
    )
}

export default Callout

import React from "react"
import Handle from "../Handle"

export default class Subject extends React.Component {
  getComponents() {}

  render() {
    const { editMode, color, strokeDasharray } = this.props

    const d = this.getComponents(this.props) || {}

    let handles
    if (editMode) {
      handles = [
        <Handle
          key="subject-handle"
          handleStart={this.props.dragStart}
          handleStop={this.props.dragEnd}
          handleDrag={this.props.dragSubject}
        />
      ]

      if (d.handles) {
        handles = handles.concat(
          d.handles.map((h, i) => (
            <Handle
              key={`subjecthandle-${i}`}
              handleStart={this.props.dragStart}
              handleStop={this.props.dragEnd}
              x={h.x}
              y={h.y}
              offsetParent={h.offsetParent && this.subject}
              handleDrag={(e, data) => {
                this.props.dragSubjectSettings(e, d.handleFunction(h, data))
              }}
            />
          ))
        )
      }
    }

    return (
      <g
        className="annotation-subject"
        {...this.props.gAttrs}
        ref={subject => {
          this.subject = subject
        }}
      >
        {d.components &&
          d.components.map((c, i) => {
            const attrs = {}
            if (!c) return null
            Object.keys(c.attrs).forEach(k => {
              if (c.attrs[k] && k !== "text") {
                attrs[k.replace(/-([a-z])/g, g => g[1].toUpperCase())] =
                  c.attrs[k]
              }
            })
            return (
              <c.type
                key={i}
                className={c.className}
                fill="none"
                stroke={color}
                strokeDasharray={strokeDasharray}
                {...attrs}
              >
                {c.attrs.text}
              </c.type>
            )
          })}
        {handles}
      </g>
    )
  }
}

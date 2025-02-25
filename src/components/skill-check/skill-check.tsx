import { useRef, useState } from "react"
import { Skill } from "../../types"
import classNames from "classnames"
import "./skill-check.css"
import { PrimitiveAtom, useAtom } from "jotai"
import { SKILL_LIST } from "../../consts"

const MAX_ROLL = 20

type SkillCheckProps = {
  skillAtom: PrimitiveAtom<Record<string, number>>
}

function SkillCheck({ skillAtom }: SkillCheckProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [skills] = useAtom(skillAtom)
  const [randomRoll, setRandomRoll] = useState(0)
  const [skill, setSkill] = useState<Skill>()
  const [success, setSuccess] = useState(false)
  const [dc, setDc] = useState<string>("")
  const [showResult, setShowResult] = useState(false)

  const handleRoll = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) {
      return
    }
    const formData = new FormData(formRef.current)
    const skillName = formData.get("skill") as string
    const skillValue = skills[skillName]
    const dc = formData.get("dc") as string
    const roll = Math.floor(Math.random() * MAX_ROLL) + 1

    const dcIntValue = parseInt(dc, 10)
    if (isNaN(dcIntValue) || !skill || !dc) {
      console.error("DC is not a number")
      return
    }

    setSuccess(roll + skillValue >= dcIntValue)
    setDc(dc)
    setSkill(skill)
    setRandomRoll(roll)

    setShowResult(true)
  }

  return (
    <div className="skillCheck">
      <h2>Skill Check</h2>
      <div className="skill-check">
        <form ref={formRef} onSubmit={handleRoll} className="skill-check__roll">
          <label className="field">
            Skill:{" "}
            <select name="skill">
              {SKILL_LIST.map((skill) => (
                <option key={skill.name} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            DC:{" "}
            <input
              type="number"
              name="dc"
              defaultValue={0}
              placeholder="number"
              className="dcField"
            />
          </label>
          <button className="btn btn--warning">Roll</button>
        </form>
        {showResult && (
          <div className="skill-check__result">
            <h2>Result</h2>
            <label className="field">
              Skill: {skill.name}:<strong>{skill.value}</strong>
            </label>
            <label className="field">You rolled: {randomRoll}</label>
            <label className="field">DC: {dc}</label>
            <label className="field">
              Result:{" "}
              <span
                className={classNames({
                  success: success,
                  failed: !success,
                })}
              >
                {success ? "Successful" : "Failure"}
              </span>
            </label>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillCheck

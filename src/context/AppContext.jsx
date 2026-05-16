import { createContext, useContext, useState, useCallback, useRef, useMemo } from "react"
import { useAccount } from "wagmi"
import { topics } from "../data/topics.js"

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { address, isConnected } = useAccount()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [canvasBlocks, setCanvasBlocks] = useState([])
  const [validation, setValidation] = useState(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationOutput, setSimulationOutput] = useState([])
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareData, setShareData] = useState(null)
  const [showHomePage, setShowHomePage] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const timerRef = useRef(null)

  const walletAddress = useMemo(() => {
    return isConnected && address ? address : "0xDEM0...1234"
  }, [isConnected, address])

  const isDemoMode = !isConnected

  const selectTopic = useCallback((topicKey) => {
    setSelectedTopic(topicKey)
    setCanvasBlocks([])
    setValidation(null)
    setSimulationOutput([])
    setSimulationComplete(false)
    setModuleCompleted(false)
    setIsSimulating(false)
    setShowHomePage(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const clearTopic = useCallback(() => {
    setSelectedTopic(null)
    setCanvasBlocks([])
    setValidation(null)
    setSimulationOutput([])
    setSimulationComplete(false)
    setModuleCompleted(false)
    setIsSimulating(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const addBlockToCanvas = useCallback((blockId) => {
    setCanvasBlocks((prev) => {
      if (prev.find((b) => b.id === blockId)) return prev
      setValidation(null)
      setSimulationComplete(false)
      setModuleCompleted(false)
      setSimulationOutput([])
      const block = topics[selectedTopic]?.blocks.find((b) => b.id === blockId)
      return [...prev, { id: blockId, name: block?.name, icon: block?.icon }]
    })
  }, [selectedTopic])

  const removeBlockFromCanvas = useCallback((blockId) => {
    setCanvasBlocks((prev) => {
      setValidation(null)
      setSimulationComplete(false)
      setModuleCompleted(false)
      setSimulationOutput([])
      return prev.filter((b) => b.id !== blockId)
    })
  }, [])

  const reorderCanvasBlocks = useCallback((startIndex, endIndex) => {
    setCanvasBlocks((prev) => {
      setValidation(null)
      setSimulationComplete(false)
      setModuleCompleted(false)
      setSimulationOutput([])
      const result = Array.from(prev)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    })
  }, [])

  const validateCanvas = useCallback(() => {
    if (!selectedTopic) return false
    const topic = topics[selectedTopic]
    const currentIds = canvasBlocks.map((b) => b.id)
    const solutionIds = topic.solution

    if (currentIds.length === 0) {
      setValidation(null)
      return false
    }

    if (currentIds.length !== solutionIds.length) {
      setValidation({
        valid: false,
        text: {
          tr: `Eksik blok var. ${solutionIds.length} blok baglamalisin.`,
          en: `Missing blocks. You need to connect ${solutionIds.length} blocks.`,
        },
      })
      return false
    }

    const isCorrect = currentIds.every((id, i) => id === solutionIds[i])

    if (isCorrect) {
      setValidation({
        valid: true,
        text: {
          tr: "Dogru siralama! Tum bloklar basariyla baglandi.",
          en: "Correct sequence! All blocks connected successfully.",
        },
      })
      return true
    } else {
      const wrongIndex = currentIds.findIndex((id, i) => id !== solutionIds[i])
      const expectedBlock = topic.blocks.find((b) => b.id === solutionIds[wrongIndex])
      setValidation({
        valid: false,
        text: {
          tr: `Hatali siralama. ${wrongIndex + 1}. sirada "${expectedBlock?.name?.tr}" olmaliydi. ${topic.rules.tr}`,
          en: `Wrong sequence. At position ${wrongIndex + 1}, "${expectedBlock?.name?.en}" was expected. ${topic.rules.en}`,
        },
      })
      return false
    }
  }, [selectedTopic, canvasBlocks])

  const startSimulation = useCallback(() => {
    if (!selectedTopic || isSimulating) return

    const isValid = validateCanvas()
    if (!isValid) return

    const topic = topics[selectedTopic]
    const steps = topic.simulation.tr
    setSimulationOutput([])
    setSimulationComplete(false)
    setIsSimulating(true)

    let step = 0
    const runStep = () => {
      if (step < steps.length) {
        setSimulationOutput((prev) => [...prev, steps[step]])
        step++
        timerRef.current = setTimeout(runStep, 1000)
      } else {
        setIsSimulating(false)
        setSimulationComplete(true)
      }
    }
    runStep()
  }, [selectedTopic, isSimulating, validateCanvas])

  const completeModule = useCallback(() => {
    setModuleCompleted(true)
  }, [])

  return (
    <AppContext.Provider
      value={{
        selectedTopic,
        selectTopic,
        clearTopic,
        canvasBlocks,
        addBlockToCanvas,
        removeBlockFromCanvas,
        reorderCanvasBlocks,
        validation,
        validateCanvas,
        isSimulating,
        simulationOutput,
        simulationComplete,
        moduleCompleted,
        startSimulation,
        completeModule,
        walletAddress,
        isDemoMode,
        showPremiumModal,
        setShowPremiumModal,
        showAccount,
        setShowAccount,
        showShareModal,
        setShowShareModal,
        shareData,
        setShareData,
        showHomePage,
        setShowHomePage,
        showOnboarding,
        setShowOnboarding,
        showLeaderboard,
        setShowLeaderboard,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}

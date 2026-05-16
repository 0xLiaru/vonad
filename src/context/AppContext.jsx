import { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { topics } from '../data/topics.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const { address, isConnected } = useAccount()
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [stepResults, setStepResults] = useState({})
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
    return isConnected && address ? address : '0xDEM0...1234'
  }, [isConnected, address])

  const isDemoMode = !isConnected

  const topicSteps = selectedTopic ? (topics[selectedTopic]?.steps || []) : []
  const totalSteps = topicSteps.length

  const selectTopic = useCallback((topicKey) => {
    setSelectedTopic(topicKey)
    setCurrentStep(0)
    setCompletedSteps([])
    setStepResults({})
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
    setCurrentStep(0)
    setCompletedSteps([])
    setStepResults({})
    setValidation(null)
    setSimulationOutput([])
    setSimulationComplete(false)
    setModuleCompleted(false)
    setIsSimulating(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const completeStep = useCallback((result) => {
    setCompletedSteps((prev) => [...prev, currentStep])
    setStepResults((prev) => ({ ...prev, [currentStep]: result }))
    setCurrentStep((prev) => prev + 1)
    setValidation(null)
    setSimulationComplete(false)
    setSimulationOutput([])
  }, [currentStep])

  const addBlockToCanvas = useCallback((blockId) => {
    setValidation(null)
    setSimulationComplete(false)
    setModuleCompleted(false)
    setSimulationOutput([])
  }, [])

  const removeBlockFromCanvas = useCallback((blockId) => {
    // Not used in step-based system but kept for compatibility
  }, [])

  const reorderCanvasBlocks = useCallback((a, b) => {}, [])

  const validateCanvas = useCallback(() => {
    return false
  }, [])

  const startSimulation = useCallback(() => {
    if (!selectedTopic || isSimulating) return
    const topic = topics[selectedTopic]
    const steps = topic.simulation?.tr || topic.steps?.map(s => s.desc?.tr || s.id) || []
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
  }, [selectedTopic, isSimulating])

  const completeModule = useCallback(() => {
    setModuleCompleted(true)
  }, [])

  return (
    <AppContext.Provider
      value={{
        selectedTopic, selectTopic, clearTopic,
        currentStep, setCurrentStep, completedSteps, completeStep,
        stepResults, totalSteps, topicSteps,
        addBlockToCanvas, removeBlockFromCanvas, reorderCanvasBlocks,
        validation, validateCanvas,
        isSimulating, simulationOutput, simulationComplete, moduleCompleted,
        startSimulation, completeModule,
        walletAddress, isDemoMode,
        showPremiumModal, setShowPremiumModal,
        showAccount, setShowAccount,
        showShareModal, setShowShareModal,
        shareData, setShareData,
        showHomePage, setShowHomePage,
        showOnboarding, setShowOnboarding,
        showLeaderboard, setShowLeaderboard,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

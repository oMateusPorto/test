import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface IStage {
    id: string;
    maintenanceId: string;
    description: string;
    status: boolean;
    type: number;
    value: any;
    createdAt: string,
}

export const initialStage = {
    id: '',
    maintenanceId: '',
    description: '',
    status: false,
    type: 0,
    value: '',
    createdAt: ''
}

export type StageContextType = {
    stage: IStage,
    stages: IStage[],
    setStage: (stage: IStage) => void,
    initialStage: IStage,
    newStage: (id: string, n: number) => void,
    updateStages: (stage: IStage) => void,
    updateStatusStage: (stage: IStage) => void,
    openStage: (id: string) => void,
    stagesOfMaintenance: IStage[],
    getStage: (id: string) => void,
    getMaintenanceId: (id: string, status: boolean) => void
    maintenanceId: {id: string, status: boolean},
    deleteStages: (id: string) => void
}

export const StageContext = createContext<StageContextType | null>(null)
StageContext.displayName = 'Stage'

const StageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [stages, setStages] = useState<IStage[]>([])
    const [stage, setStage] = useState(initialStage)
    const [stagesOfMaintenance, setStagesOfMaintenance] = useState<IStage[]>([])
    const [maintenanceId, setMaintenanceId] = useState({id: '', status: false })

    const openStage = (id: string) => {
        const item = stages.filter(item => item.maintenanceId === id)
        setStagesOfMaintenance(item)
    }

    const newStage = (id: string, n: number) => {
        const item =  {...stage, id: uuidv4(), maintenanceId: id, type: n }
        setStage(item)
        setStages([...stages, item])
    }

    const getMaintenanceId = (id: string, status: boolean) => {
        setMaintenanceId({id:id, status:status})
    }

    const getStage = (id: string) => {
        const item = stages.filter(item => item.id === id)
        setStage(item[0])
    }

    const updateStages = (stage: IStage) => {
        setStages(stages.map(i => i.id === stage.id ? stage : i))
    }

    const updateStatusStage = (stage: IStage) => {
        const up = { ...stage, status: true }
        updateStages(up)
    }

    const deleteStages = (id: string) => {
        const filterdStages = stages.filter(i => i.maintenanceId !== id)
        setStages(filterdStages)
    }

    return <StageContext.Provider value={{
        stages,
        stage,
        setStage,
        initialStage,
        newStage,
        updateStages,
        updateStatusStage,
        openStage,
        stagesOfMaintenance,
        getStage,
        getMaintenanceId,
        maintenanceId,
        deleteStages
    }}>
        {children}
    </StageContext.Provider>
}

export default StageProvider
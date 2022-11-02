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
    createdAt: Date()
}

export type StageContextType = {
    stage: IStage,
    stages: IStage[],
    setStage: (stage: IStage) => void,
    initialStage: IStage,
    newStage: (id: string) => void,
    updateStages: (stage: IStage) => void,
    updateStatusStage: (stage: IStage) => void,
    openStage: (id: string) => void,
    stagesOfMaintenance: IStage[]
}

export const StageContext = createContext<StageContextType | null>(null)
StageContext.displayName = 'Stage'

const StageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [stages, setStages] = useState<IStage[]>([])
    const [stage, setStage] = useState(initialStage)
    const [stagesOfMaintenance, setStagesOfMaintenance] = useState<IStage[]>([])

    const openStage = (id: string) => {
        const item = stages.filter(item => item.maintenanceId === id)
        setStagesOfMaintenance(item)
    }

    const newStage = (id: string) => {
        const newStage:IStage[] = []
        for(var i = 1; i <= 3; i++){
            newStage.push({...stage, id: uuidv4(), maintenanceId: id, type: i})  
        }
        setStages([...stages, newStage[0], newStage[1], newStage[2]])
    }

    const updateStages = (stage: IStage) => {
        setStages(stages.map(i => i.id === stage.id ? stage : i))
    }

    const updateStatusStage = (stage: IStage) => {
        const up = { ...stage, status: true }
        updateStages(up)
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
        stagesOfMaintenance
    }}>
        {children}
    </StageContext.Provider>
}

export default StageProvider
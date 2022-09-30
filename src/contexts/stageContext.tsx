import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface IStage {
    id: string;
    maintenanceId: string;
    description: string;
    status: boolean;
    type: number;
    value: { text: string, number: number, file: string };
    createdAt: string,
}

export const initialStage = {
    id: '',
    maintenanceId: '',
    description: '',
    status: false,
    type: 0,
    value: { text: '', number: 0, file: '' },
    createdAt: Date()
}

export type StageContextType = {
    stage: IStage,
    stages: IStage[],
    setStage: (stage: IStage) => void,
    initialStage: IStage,
    newStage:(id: string) => void,
    updateStages:(stage: IStage) => void,
    updateStatusStage:(stage: IStage) => void,
    openStage: (id: string) =>void
}

export const StageContext = createContext<StageContextType | null>(null)

const StageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [stages, setStages] = useState<IStage[]>([])
    
    const [stage, setStage] = useState(initialStage)

    const openStage = (id:string) => {
        const stage = stages.filter(item => item.maintenanceId === id)
        if(stage.length !== 0){
            setStage(stage[0])
        } else{
            newStage(id)
        }
        console.log(stage)
        console.log(stages)
    }
    
    const newStage = (id:string) => {
        setStages([...stages, { ...initialStage, id: uuidv4(), maintenanceId:id }])
        setStage(stage)
    }

    const updateStages = (stage: IStage) => {
        setStages(stages.map(i => i.id === stage.id ? stage : i))
    }

    const updateStatusStage = (stage: IStage) => {
        const up = {...stage, status: true }
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
        openStage
    }}>
        {children}
    </StageContext.Provider>
}

export default StageProvider
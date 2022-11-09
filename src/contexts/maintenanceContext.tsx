import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface IMaintenance {
    id: string;
    userId: string;
    description: string;
    status: boolean;
    createdAt: string;
}

export const initialMaintenance = {
    id: '',
    userId: '',
    description: '',
    status: false,
    createdAt: Date(),
}

export type MaintenanceContextType = {
    maintenances: IMaintenance[],
    saveMaintenance: (maintenance: IMaintenance, userId: string) => void,
    updateMaintenance: (maintenance: IMaintenance) => void,
    deleteMaintenance: (id: string) => void,
    maintenance: IMaintenance,
    getMaintenance: (id: string) => void,
    setMaintenance: (maintenance: IMaintenance) => void,
    initialMaintenance: IMaintenance,
    updateStatusMaintenance: (id: string) => void
}

export const MaintenanceContext = createContext<MaintenanceContextType | null>(null)
MaintenanceContext.displayName = 'Maintenance'

const MaintenanceProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [maintenances, setMaintenances] = useState<IMaintenance[]>([])

    const [maintenance, setMaintenance] = useState(initialMaintenance)

    const getMaintenance = (id: string) => {
        const item = maintenances.filter(item => item.id === id)
        setMaintenance(item[0])
    }

    const saveMaintenance = (maintenance: IMaintenance, userId: string) => {
        setMaintenances([...maintenances, {
            ...maintenance,
            id: uuidv4(),
            userId: userId,
            createdAt: new Date().toLocaleDateString()
        }])
    }

    const updateMaintenance = (maintenance: IMaintenance) => {
        setMaintenances(maintenances.map(i => i.id === maintenance.id ? maintenance : i))
    }

    const deleteMaintenance = (id: string) => {
        const filteredMaintenance = maintenances.filter(i => i.id !== id)
        setMaintenances(filteredMaintenance)
    }

    const updateStatusMaintenance = (id: string) => {
        const item = maintenances.filter(item => item.id === id)
        const a = { ...item[0], status: true }
        updateMaintenance(a)
      }

    return <MaintenanceContext.Provider value={{
        maintenances,
        saveMaintenance,
        updateMaintenance,
        deleteMaintenance,
        maintenance,
        getMaintenance,
        setMaintenance,
        initialMaintenance,
        updateStatusMaintenance
    }}>
        {children}
    </MaintenanceContext.Provider>
}

export default MaintenanceProvider




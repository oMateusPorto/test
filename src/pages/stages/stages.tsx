import NavBar from "../../components/navbar";
import TitlePage from "../../components/title-page";
import StagesModal from "./stagesModal";
import { useContext, useEffect, useState } from "react";
import { MaintenanceContext, MaintenanceContextType } from "../../contexts/maintenanceContext";
import { StageContext, StageContextType } from "../../contexts/stageContext";
import { useNavigate } from "react-router-dom";

export default function Stages() {

    const navigate = useNavigate()

    const { updateStatusMaintenance } = useContext(MaintenanceContext) as MaintenanceContextType
    const {
        stagesOfMaintenance,
        stages,
        openStage,
        getStage,
        maintenanceId,
        newStage
    } = useContext(StageContext) as StageContextType

    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const togleShowMaintenanceModal = () => setShowMaintenanceModal(!showMaintenanceModal)

    function editStage(id: string) {
        getStage(id)
        togleShowMaintenanceModal()
    }

    useEffect(() => {
        openStage(maintenanceId.id)
    }, [stages])

    function finalizeStages() {
        if (stagesOfMaintenance.length === 3) {
            if (stagesOfMaintenance[2].status) {
                updateStatusMaintenance(maintenanceId.id)
                navigate('/UserMaintenance')
                return
            }
        }
        alert('Necessário concluir as 3 etapas para finalizar a manutenção')
    }

    function AddNewStage(n: number) {
        if (stagesOfMaintenance.length > 0 && !stagesOfMaintenance[n - 2].status) {
            alert('Necessário concluir a etapa de manutenção atual para criar uma nova!')
            return
        }
        togleShowMaintenanceModal()
        newStage(maintenanceId.id, n)
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <TitlePage title="Etapas da Manutenção">
                    {stagesOfMaintenance.length < 3 ?
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => AddNewStage(stagesOfMaintenance.length + 1)}
                        >
                            Nova etapa
                        </button>
                        :
                        <></>
                    }
                </TitlePage>
                {stagesOfMaintenance.length >= 1 ?
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Data da Execução</th>
                                    <th scope="col">Valor</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {stagesOfMaintenance.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.description}</td>
                                        <td>{item.status ? 'Etapa finalizada' : 'Etapa em execução'}</td>
                                        <td>{item.createdAt}</td>
                                        <td>{item.value}</td>
                                        {!maintenanceId.status ?
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    disabled={false}
                                                    onClick={() => editStage(item.id)}
                                                >
                                                    Editar
                                                </button>
                                            </td>
                                            :
                                            <></>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-end">
                            {!maintenanceId.status ?
                                <button
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => finalizeStages()}
                                >
                                    Finalizar
                                </button>
                                :
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => navigate('/UserMaintenance')}
                                >
                                    voltar
                                </button>
                            }
                        </div>
                    </>
                    :
                    <p className="text-center mt-3">Não há etapas cadastradas</p>
                }
                <StagesModal
                    showMaintenanceModal={showMaintenanceModal}
                    togleShowMaintenanceModal={togleShowMaintenanceModal}
                />

            </div>
        </>
    )
}
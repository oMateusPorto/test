import NavBar from "../../components/navbar";
import TitlePage from "../../components/title-page";
import { Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { MaintenanceContext, MaintenanceContextType } from "../../contexts/maintenanceContext";
import { IStage, StageContext, StageContextType } from "../../contexts/stageContext";

export default function Stages() {

    const { maintenance } = useContext(MaintenanceContext) as MaintenanceContextType
    const { stagesOfMaintenance, setStage, stage, newStage, stages, openStage, initialStage } = useContext(StageContext) as StageContextType

    const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
    const togleShowMaintenanceModal = () => setShowMaintenanceModal(!showMaintenanceModal)

    const mock = [{
        id: '123',
        maintenanceId: '1234',
        description: 'Fase de texto',
        status: true,
        type: 1,
        value: 'Inserido o texto aqui',
        createdAt: Date()
    }, {
        id: '324',
        maintenanceId: '1234',
        description: 'Fase de número',
        status: true,
        type: 2,
        value: 'Inserido o número aqui',
        createdAt: Date()
    }, {
        id: '323',
        maintenanceId: '1234',
        description: '',
        status: false,
        type: 3,
        value: '',
        createdAt: Date()
    }]

    function typeOfStage(number: Number) {
        switch (number) {
            case 1:
                return 'Etapa de texto'
            case 2:
                return 'Etapa de número'
            case 3:
                return 'Etapa de arquivo'
            default:
                return ''
        }
    }

    function typeOfInput(number: Number) {
        switch (number) {
            case 1:
                return 'text'
            case 2:
                return 'number'
            case 3:
                return 'text'
            default:
                return ''
        }
    }

    function initStage() {
        togleShowMaintenanceModal()
    }

    useEffect(() => {
        openStage(maintenance.id)
    },[stages])

    function handleSaveModalStage(stage: IStage, n: number) {
        // getStage para editar e retirar o newStage
        //newStage(maintenance.id, n)
        togleShowMaintenanceModal()
        setStage(initialStage)
        console.log(stage)
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <TitlePage title="Etapas da Manutenção"/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Etapa</th>
                            <th scope="col">Status</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stagesOfMaintenance.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{typeOfStage(item.type)}</td>
                                <td>{item.status ? 'Etapa finalizada' : 'Etapa em execução'}</td>
                                <td>{item.description}</td>
                                <td>{item.value}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary">
                                        Iniciar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => console.log(stages)}
                            //disabled={stagesOfMaintenance[2].status ? false : true}
                        >
                            Finalizar
                        </button>
                </div>
                <Modal show={showMaintenanceModal} onHide={togleShowMaintenanceModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{typeOfStage(stagesOfMaintenance.length + 1)}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={stage.description}
                                    onChange={(e) => setStage({ ...stage, description: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Valor</label>
                                <input
                                    type={typeOfInput(stagesOfMaintenance.length + 1)}
                                    className="form-control"
                                    value={stage.value}
                                    onChange={(e) => setStage({ ...stage, value: e.target.value })} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={false}
                            onClick={() => handleSaveModalStage(stage, stagesOfMaintenance.length + 1)}
                        >
                            Salvar
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export class TrackingService {
    static async getHistorial(token, codigo_envio) {
        // Consulta historial
        const historialUrl = `https://picklog.akeron.net/api/v1/shipping/historial/${codigo_envio}`;
        const historialRes = await fetch(historialUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const historialData = await historialRes.json();
        if (!historialRes.ok) {
            throw new Error(historialData.msg || 'Error consultando historial');
        }

        // Consulta info logística (state)
        const stateUrl = `https://picklog.akeron.net/api/v1/shipping/state/${codigo_envio}`;
        const stateRes = await fetch(stateUrl, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const stateData = await stateRes.json();
        // No lanzamos error aquí, devolvemos el error en la respuesta si ocurre

        return {
            historial: historialData,
            state: stateData
        };
    }
}

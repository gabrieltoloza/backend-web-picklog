
export const getTokenAkeron = async (req, res, next) => {
    const client_api = process.env.AKERON_CLIENT_API;
    const client_secret = process.env.AKERON_CLIENT_SECRET;

    if (!client_api || !client_secret) {
        return res.status(400).json({
            success: false,
            type: 'validation',
            error: 'Faltan client_api o client_secret'
        });
    }

    try {
        const response = await fetch('https://picklog.akeron.net/api/v1/auth/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ client_api, client_secret })
        });

        const data = await response.json();

        console.log(data)

        if (data.status === true && Array.isArray(data.result) && data.result[0]?.api_token) {
            req.akeronToken = data.result[0].api_token; // Solo el token
            next();
        } else {
            return res.status(401).json({
                success: false,
                type: 'akeron',
                error: data.msg || 'Error al obtener token'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            type: 'akeron',
            error: 'Ocurrió un error inesperado'
        });
    }
};
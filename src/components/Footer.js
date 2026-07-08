import React from 'react';

const Footer = () => {
    const anioActual = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div>
                <p style={styles.text}>
                    <strong>Distribuidora Gloria S.A.C.</strong> | RUC: 20123456789
                </p>
                <p style={styles.text}>
                    © {anioActual} Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#1f2937',
        color: '#ffffff',
        padding: '15px 20px',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: '3px solid #c8102e',
    },
    text: {
        margin: 0,
        fontSize: '14px',
        opacity: 0.9,
    }
};

export default Footer;
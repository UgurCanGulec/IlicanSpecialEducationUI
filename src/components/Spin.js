import React from 'react';
import { RiseLoader } from 'react-spinners';

const Spin = ({ spinner = false, children }) => {
    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {children}

            {spinner && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                    pointerEvents: 'auto'
                }}>
                    <RiseLoader color='orange' size={40} />
                </div>
            )}

            {spinner && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9998,
                    backgroundColor: 'transparent',
                    pointerEvents: 'auto'
                }} />
            )}
        </div>
    );
};

export default Spin;

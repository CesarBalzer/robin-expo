import {useContext} from 'react';
import {VehicleContext, VehicleContextType} from '@app/context/VehicleContext';

export const useVehicle = (): VehicleContextType => {
	const context = useContext(VehicleContext);
	if (!context) {
		throw new Error('useVehicle must be used within a VehicleProvider');
	}
	return context;
};

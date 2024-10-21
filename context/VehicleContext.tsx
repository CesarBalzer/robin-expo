import React, {createContext, useState, useEffect, useCallback, useMemo} from 'react';
import StorageService from '@app/services/StorageService';
import api from '@app/api';

export type VehicleContextType = {
	vehicle: any;
	setVehicle: (vehicle: any) => void;

	vehicles: any;
	setVehicles: (vehicles: any) => void;

	loadVehicles: () => Promise<void>;
};

export const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({children}: {children: React.ReactNode}) => {
	const [vehicles, setVehicles] = useState<any[] | null>(null);
	const [vehicle, setVehicle] = useState<any | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadVehiclesFromStorage = async () => {
			const storedVehicles = await StorageService.getJson('vehicles');
			const selectedVehicle = await StorageService.getJson('selected_vehicle');
			if (storedVehicles) {
				setVehicles(storedVehicles);
				setVehicle(selectedVehicle);
			}
			setLoading(false);
		};

		loadVehiclesFromStorage();
	}, []);

	const loadVehicles = useCallback(async () => {
		// if (vehicles) {
		// 	return;
		// }
		const fetchedVehicles = await api.vehicle.fetchAll();
		setVehicles(fetchedVehicles);
		await StorageService.storeJson('vehicles', fetchedVehicles);
	}, [vehicles]);

	const setVehicleAndStore = useCallback(async (vehicle: any) => {
		setVehicle(vehicle);
		await StorageService.storeJson('selected_vehicle', vehicle);
	}, []);

	const setVehiclesAndStore = useCallback(async (vehicles: any) => {
		setVehicles(vehicles);
		await StorageService.storeJson('vehicles', vehicle);
	}, []);

	const memoizedVehicles = useMemo(() => vehicles, [vehicles]);

	if (loading) {
		return null;
	}

	return (
		<VehicleContext.Provider
			value={{
				vehicles,
				vehicle,
				setVehicle: setVehicleAndStore,
				setVehicles: setVehiclesAndStore,
				loadVehicles
			}}
		>
			{children}
		</VehicleContext.Provider>
	);
};

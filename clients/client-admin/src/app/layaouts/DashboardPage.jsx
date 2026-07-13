import { useEffect } from "react";
import { DashBoardContainer } from "../../shared/components/layaout/DashBoardContainer";
import { Outlet } from "react-router-dom";


export const DashboardPage = () => {
  useEffect(() => {
    document.title = "Panel - Reportes de Prácticas";
  }, []);

  return (
    <DashBoardContainer>
      <Outlet />
    </DashBoardContainer>
  );
};
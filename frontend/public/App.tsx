export const App = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-[#28282b]'>
      <WindowView />
    </div>
  );
};

const WindowView = () => {
  return (
    <div className='bg-stone-50 h-80 w-90 p-4 rounded-xl flex flex-col gap-2'>
      <TitleBar />
      <div className="bg-stone-200 h-full w-full rounded-lg">
        <PomodoroView />
      </div>
    </div>
  );
};

const TitleBar = () => {
  return (
    <div className='h-8 w-full flex items-center justify-between px-2'>
      {/* Aba */}
      <div className="flex gap-1">
        <button className="py-1 px-2 bg-red-200 text-sm">X</button> {/* Pomodoro Icon */}
        <button className="py-1 px-2 bg-red-200 text-sm">X</button> {/* Dashboard Icon */}
        <button className="py-1 px-2 bg-red-200 text-sm">X</button> {/* Config Icon */}

      </div>

      {/* Botões de janela */}
      <div className='flex gap-1'>
        <button className='py-1 px-2 bg-red-500 text-sm'>x</button> {/* Minimize */}
        <button className='py-1 px-2 bg-green-500 text-sm'>x</button> {/* Close */}
      </div>
    </div>
  );
};

const PomodoroView = () => {
  return (
    <div className='bg-stone-200 h-full w-full rounded-lg'></div>
  );
}

const DashboardView = () => {
  return (
    <div className='bg-stone-200 h-full w-full rounded-lg'></div>
  );
}

const ConfigView = () => {  
  return (
    <div className='bg-stone-200 h-full w-full rounded-lg'></div>
  );
}
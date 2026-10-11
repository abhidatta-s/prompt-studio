import { Header, PasswordGate, PresetsPanel, PromptForm, PromptPreview } from './components'
import { usePresets } from './hooks/usePresets'
import { usePromptBuilder } from './hooks/usePromptBuilder'

function Studio() {
  const { state, prompt, stats, setValue, setEnabled, replace, reset, loadExample } = usePromptBuilder()
  const { presets, savePreset, deletePreset } = usePresets()

  return (
    <div className="app">
      <Header onExample={loadExample} onReset={reset} />
      <main className="layout">
        <div className="layout__col">
          <PromptForm state={state} onValue={setValue} onToggle={setEnabled} />
        </div>
        <div className="layout__col">
          <PromptPreview prompt={prompt} stats={stats} />
          <PresetsPanel
            presets={presets}
            current={state}
            onSave={savePreset}
            onLoad={replace}
            onDelete={deletePreset}
          />
        </div>
      </main>
      <footer className="footer">Prompt Studio · a demo project · your data stays in your browser</footer>
    </div>
  )
}

export default function App() {
  return (
    <PasswordGate>
      <Studio />
    </PasswordGate>
  )
}

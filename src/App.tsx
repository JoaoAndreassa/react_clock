import React from 'react';
import { Clock } from './clock';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type AppState = {
  hasClock: boolean;
  clockName: string;
};

export class App extends React.Component<{}, AppState> {
  private nameInterval: number | undefined;

  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
  };

  componentDidMount() {
    this.nameInterval = window.setInterval(() => {
      const newName = getRandomName();

      this.setState({ clockName: newName });
    }, 3300);
  }

  handleLeftClick = (event: React.MouseEvent) => {
    event.preventDefault(); // previne o contexto padrão em alguns navegadores
    this.setState({ hasClock: true });
  };

  handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  componentWillUnmount() {
    clearInterval(this.nameInterval);
  }

  render() {
    return (
      <div
        className="App"
        onClick={this.handleLeftClick}
        onContextMenu={this.handleRightClick}
      >
        <h1>React clock</h1>
        {this.state.hasClock ? (
          <Clock name={this.state.clockName} />
        ) : (
          <p>Clock hidden</p>
        )}
      </div>
    );
  }
}

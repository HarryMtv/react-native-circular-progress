import React from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnimatedCircularProgress } from '@harrymtv/react-native-circular-progress';

type AppState = {
  isMoving: boolean;
  pointsDelta: number;
  points: number;
};

const MAX_POINTS = 500;

export default class App extends React.Component<Record<string, never>, AppState> {
  state: AppState = {
    isMoving: false,
    pointsDelta: 0,
    points: 325,
  };

  private panResponder: PanResponderInstance;
  private circularProgressRef = React.createRef<AnimatedCircularProgress>();

  constructor(props: Readonly<Record<string, never>>) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.alwaysHandlePan,
      onStartShouldSetPanResponderCapture: this.alwaysHandlePan,
      onMoveShouldSetPanResponder: this.alwaysHandlePan,
      onMoveShouldSetPanResponderCapture: this.alwaysHandlePan,

      onPanResponderGrant: this.handlePanGrant,

      onPanResponderMove: this.handlePanMove,
      onPanResponderTerminationRequest: this.alwaysHandlePan,
      onPanResponderRelease: this.handlePanRelease,
    });
  }

  private alwaysHandlePan = (
    _evt: GestureResponderEvent,
    _gestureState: PanResponderGestureState
  ): boolean => true;

  private handlePanGrant = (_evt: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
    this.setState({ isMoving: true, pointsDelta: 0 });
  };

  private handlePanMove = (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    if (this.circularProgressRef.current) {
      this.circularProgressRef.current.animate(0, 0);
    }
    // For each 2 pixels add or subtract 1 point
    this.setState({ pointsDelta: Math.round(-gestureState.dy / 2) });
  };

  private handlePanRelease = (_evt: GestureResponderEvent, _gestureState: PanResponderGestureState) => {
    if (this.circularProgressRef.current) {
      this.circularProgressRef.current.animate(100, 3000);
    }
    const points = this.state.points + this.state.pointsDelta;

    this.setState({
      isMoving: false,
      points: points > 0 ? Math.min(points, MAX_POINTS) : 0,
      pointsDelta: 0,
    });
  };

  render() {
    const fill = (this.state.points / MAX_POINTS) * 100;
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        <AnimatedCircularProgress
          size={200}
          width={3}
          backgroundWidth={30}
          fill={fill}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        >
          {progress => <Text style={styles.points}>{Math.round((MAX_POINTS * progress) / 100)}</Text>}
        </AnimatedCircularProgress>

        <AnimatedCircularProgress
          size={120}
          width={15}
          backgroundWidth={5}
          fill={fill}
          tintColor="#00ff00"
          tintColorSecondary="#ff0000"
          backgroundColor="#3d5875"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
        />

        <AnimatedCircularProgress
          size={100}
          width={25}
          fill={0}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          ref={this.circularProgressRef}
          backgroundColor="#3d5875"
          arcSweepAngle={180}
        />

        <Text style={[styles.pointsDelta, this.state.isMoving && styles.pointsDeltaActive]}>
          {this.state.pointsDelta >= 0 && '+'}
          {this.state.pointsDelta}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  points: {
    textAlign: 'center',
    color: '#7591af',
    fontSize: 50,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#152d44',
    padding: 50,
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: '100',
  },
  pointsDeltaActive: {
    color: '#fff',
  },
});

import { render,screen } from '@testing-library/react';
import { Film } from '../../Moq/Films-List';
import VideoPlayer from './video-player';

describe('Component: AudioPlayer', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render correctly activvideo true', () => {
    render(
      <VideoPlayer
        film={Film} activeVideo
      />,
    );
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
  it('should render correctly activvideo false', () => {
    render(
      <VideoPlayer
        film={Film} activeVideo={false}
      />,
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});

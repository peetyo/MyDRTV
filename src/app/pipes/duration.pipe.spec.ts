import { DurationPipe } from './duration.pipe';

fdescribe('DurationPipe', () => {
  let pipe: DurationPipe;

  beforeEach(()=>{
    pipe = new DurationPipe();
  });

  fit('values over an hour return h and min', () => {
    expect(pipe.transform(90)).toBe('1h 30min');
  });

  fit('values under an hour return min only', () => {
    expect(pipe.transform(45)).toBe('45min');
  });

  fit('full hours return only the number of hours', () => {
    expect(pipe.transform(60)).toBe('1h');
  });

});

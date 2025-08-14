import { render, screen } from '@testing-library/react';
import Test, { getServerSideProps } from './test';
import { JulesAutomationAgent } from '../src/jules-agent';

jest.mock('../src/jules-agent');

describe('Test Page', () => {
  const mockAnalysis = {
    projectType: 'Next.js',
    keyDependencies: [
      { name: 'react', version: '18.0.0' },
      { name: 'next', version: '14.0.0' },
    ],
    folderStructure: [],
    testingSetup: {
      framework: 'Jest',
      testingLibrary: 'React Testing Library',
    },
  };

  it('should render the analysis results', () => {
    render(<Test analysis={mockAnalysis} />);

    expect(screen.getByText('System Analysis')).toBeInTheDocument();
    expect(screen.getByText('Project Type')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Key Dependencies')).toBeInTheDocument();
    expect(screen.getByText('react: 18.0.0')).toBeInTheDocument();
    expect(screen.getByText('next: 14.0.0')).toBeInTheDocument();
    expect(screen.getByText('Testing Setup')).toBeInTheDocument();
    expect(screen.getByText('Framework: Jest')).toBeInTheDocument();
    expect(screen.getByText('Library: React Testing Library')).toBeInTheDocument();
  });

  it('getServerSideProps should fetch analysis and return as props', async () => {
    const mockAnalyzeRepository = jest.fn().mockResolvedValue(mockAnalysis);
    (JulesAutomationAgent as jest.Mock).mockImplementation(() => {
      return {
        analyzeRepository: mockAnalyzeRepository,
      };
    });

    const result = await getServerSideProps({} as any);

    expect(mockAnalyzeRepository).toHaveBeenCalled();
    expect(result).toEqual({
      props: {
        analysis: mockAnalysis,
      },
    });
  });
});

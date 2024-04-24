export const SeparateLine = () => {
    return (
        <div className="separateLine" data-testid="separateLine">
            <div className="separateLine__line" data-testid='line1'/>
            <span className="separateLine__icon" data-testid='icon'></span>
            <div className="separateLine__line" data-testid="line2"/>
        </div>
    );
};
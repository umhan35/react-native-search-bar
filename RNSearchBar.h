#import <UIKit/UIKit.h>

@class RCTEventDispatcher;

@interface RNSearchBar : UISearchBar

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;
- (void)setCancelButtonText:(NSString *)text;
- (void)setUseCancelButton:(BOOL)state;
- (void)setCancelButtonUsesAnimation:(BOOL)state;

@end

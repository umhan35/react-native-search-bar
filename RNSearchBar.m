#import "RNSearchBar.h"

#import "UIView+React.h"
#import "RCTEventDispatcher.h"

@interface RNSearchBar() <UISearchBarDelegate>

@end

@implementation RNSearchBar
{
  RCTEventDispatcher *_eventDispatcher;
  NSInteger _nativeEventCount;
}

NSString *cancelButtonText = nil;
BOOL useCancelButton = NO;
BOOL cancelButtonUsesAnimation = YES;

- (void)setCancelButtonText:(NSString *)text
{
    cancelButtonText = text;
}

- (void)setUseCancelButton:(BOOL)state
{
    useCancelButton = state;
}

- (void)setCancelButtonUsesAnimation:(BOOL)state
{
    cancelButtonUsesAnimation = state;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if ((self = [super initWithFrame:CGRectMake(0, 0, 1000, 44)])) {
    _eventDispatcher = eventDispatcher;
    self.delegate = self;
  }
  return self;
}

- (void) searchBarTextDidEndEditing:(UISearchBar *)searchBar
{
    [_eventDispatcher sendTextEventWithType:RCTTextEventTypeBlur
                                   reactTag:self.reactTag
                                       text:searchBar.text
                                 eventCount:_nativeEventCount];
    
}


- (void)searchBarTextDidBeginEditing:(UISearchBar *)searchBar
{
  if (useCancelButton) {
    [self setShowsCancelButton:YES animated:cancelButtonUsesAnimation];
    if (cancelButtonText) {
      // http://stackoverflow.com/questions/2536151/how-to-change-the-default-text-of-cancel-button-which-appears-in-the-uisearchbar
      for (UIView *subView in [[searchBar.subviews objectAtIndex:0] subviews]){
        if([subView isKindOfClass:[UIButton class]]){
          [(UIButton*)subView setTitle:cancelButtonText forState:UIControlStateNormal];
        }
      }
    }
  }


  [_eventDispatcher sendTextEventWithType:RCTTextEventTypeFocus
                                 reactTag:self.reactTag
                                     text:searchBar.text
                            eventCount:_nativeEventCount];
}

- (void)searchBar:(UISearchBar *)searchBar textDidChange:(NSString *)searchText
{
    _nativeEventCount++;

  [_eventDispatcher sendTextEventWithType:RCTTextEventTypeChange
                                 reactTag:self.reactTag
                                     text:searchText
                               eventCount:_nativeEventCount];
}

- (void)searchBarSearchButtonClicked:(UISearchBar *)searchBar
{
  NSDictionary *event = @{
                          @"target": self.reactTag,
                          @"button": @"search",
                          @"searchText": searchBar.text
                          };

  [_eventDispatcher sendInputEventWithName:@"press" body:event];
}


- (void)searchBarCancelButtonClicked:(UISearchBar *)searchBar
{
  self.text = @"";
  [self resignFirstResponder];
  [self setShowsCancelButton:NO animated:cancelButtonUsesAnimation];

  NSDictionary *event = @{
                          @"target": self.reactTag,
                          @"button": @"cancel"
                          };

  [_eventDispatcher sendInputEventWithName:@"press" body:event];
}


@end
